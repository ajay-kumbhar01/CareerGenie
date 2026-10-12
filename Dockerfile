# ============================================================
# Stage 1: deps — Install production + dev dependencies
# ============================================================
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
COPY prisma ./prisma

RUN npm ci --legacy-peer-deps

# ============================================================
# Stage 2: builder — Generate Prisma client & build Next.js
# ============================================================
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the full application source
COPY . .

# Generate the Prisma client (mirrors the postinstall script)
RUN npx prisma generate

# Clerk validates the publishable key format at build time during static page
# generation. A valid-format dummy key lets the build succeed; the real key is
# injected at runtime via --env-file or Kubernetes secrets.
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_cGxhY2Vob2xkZXIuZXhhbXBsZS5jb20k"
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}

# Suppress Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ============================================================
# Stage 3: runner — Minimal production image
# ============================================================
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Run as non-root for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy the standalone server bundle from the builder
COPY --from=builder /app/.next/standalone ./

# Copy static assets that the standalone bundle does not include
COPY --from=builder /app/.next/static ./.next/static

# Copy public assets (banner images, favicon, etc.)
COPY --from=builder /app/public ./public

# Copy Prisma schema + generated client so the runtime can connect to the DB.
# The generated client lives inside node_modules (already in standalone), but
# the schema is needed for certain Prisma operations.
COPY --from=builder /app/prisma ./prisma

# Set ownership for the nextjs user
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

# Start the Next.js standalone server
CMD ["node", "server.js"]
