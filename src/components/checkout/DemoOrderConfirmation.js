import Link from "next/link";

export default function DemoOrderConfirmation({ paymentMethod }) {
  return (
    <main className="min-h-screen bg-[#F5F2EC] px-4 py-12 text-[#35332F] sm:px-6 sm:py-16 lg:px-8">
      <section
        aria-labelledby="demo-order-confirmation-title"
        role="status"
        className="mx-auto max-w-2xl border border-[#DED8CD] bg-[#FBFAF7] px-6 py-10 text-center sm:px-12 sm:py-14"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D2AD86]/70 bg-[#F8EBDD] text-[#A97845]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5 12.5 4.5 4.5L19 7"
            />
          </svg>
        </span>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A77B52]">
          Crueze TimeLine
        </p>
        <h1
          id="demo-order-confirmation-title"
          className="mt-3 font-serif text-2xl font-normal leading-tight text-[#302219] sm:text-3xl"
        >
          ORDER PLACED SUCCESSFULLY!
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#6D6961] sm:text-base">
          Thank you for choosing Crueze TimeLine.
        </p>
        <dl className="mx-auto mt-7 max-w-sm border-y border-[#DED8CD] py-4 text-left">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-xs uppercase tracking-[0.12em] text-[#6D6961]">
              Selected payment method
            </dt>
            <dd className="text-sm font-medium text-[#35332F]">
              {paymentMethod}
            </dd>
          </div>
        </dl>

        <Link
          href="/watches"
          className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#302219] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F8EBDD] transition-colors hover:bg-[#6B4933] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-2"
        >
          CONTINUE SHOPPING
        </Link>
      </section>
    </main>
  );
}
