# PayPal Vercel Fix Implementation Plan

> Goal: restore the Vercel deployment so `/payments` works directly on Vercel using PayPal env vars.
>
> Architecture: revert the frontend payment flow to the direct PayPal implementation, then write production PayPal values into the linked Vercel project.

---

### Task 1: Restore direct PayPal routes
- Modify: `apps/web/app/api/payments/paypal/config/route.ts`
- Modify: `apps/web/app/api/payments/paypal/create-order/route.ts`
- Modify: `apps/web/app/api/payments/paypal/capture-order/route.ts`
- Test: `npm run build`

### Task 2: Restore Vercel-facing checkout copy
- Modify: `apps/web/components/PayPalPaymentsPanel.tsx`
- Modify: `apps/web/app/payments/page.tsx`
- Test: `npm run build`

### Task 3: Write Vercel environment variables
- Project: `stevens-projects-08c9c5b0/diyasi-web`
- Add: `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_ENV=live`
- Test: `vercel env ls`

### Task 4: Verify and push
- Modify: `README.md` if needed
- Test: `npm run build`, `git status --short`
- Commit and push the restored direct PayPal flow.

