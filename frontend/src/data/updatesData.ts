export interface UpdateItem {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  linkText?: string;
  linkHref?: string;
}

export const updatesData: UpdateItem[] = [
  {
    id: "online-client-questionnaire",
    title: "New: Online Client Questionnaire",
    date: "September 2026",
    category: "Service Update",
    content: "New clients can now complete our onboarding questionnaire online before the first call. It takes about 5 minutes and helps us prepare a tailored proposal and draft SLA faster.",
    linkText: "Start the questionnaire →",
    linkHref: "/get-started"
  },
  {
    id: "monthly-reporting-bookkeeping",
    title: "Monthly Reporting Now Included for All Bookkeeping Clients",
    date: "September 2026",
    category: "Service Update",
    content: "Every bookkeeping client now receives a month-end pack by business day 6: profit and loss, balance sheet, cash summary and a short note on key movements. No change to pricing."
  },
  {
    id: "regulation-f-reminders",
    title: "Industry Update: Regulation F Reminders for Collection Files",
    date: "September 2026",
    category: "Industry Update",
    content: "Regulation F, which implements the FDCPA, sets specific rules on validation notices, call frequency and electronic communication opt-outs, and requires records to be kept for three years. Our legal support team has refreshed its file checklist to match. Read the full checklist in our article, FDCPA and Regulation F: A Practical Checklist for Notice Drafting."
  },
  {
    id: "extended-support-hours",
    title: "Extended Support Hours for North American Clients",
    date: "October 2026",
    category: "Service Update",
    content: "To better serve clients in North American region our team now provides coverage from 9:00 AM EST to 3:30 PM EST, for 5 days a week. Your account manager will confirm any changes to your schedule."
  }
];
