import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type EnquiryPrefill = {
  interest?: string;
  date?: string;
  guests?: string;
};

type EnquiryValue = {
  open: boolean;
  prefill: EnquiryPrefill;
  session: number;
  openEnquiry: (prefill?: EnquiryPrefill) => void;
  closeEnquiry: () => void;
};

const EnquiryContext = createContext<EnquiryValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<EnquiryPrefill>({});
  const [session, setSession] = useState(0);

  const value = useMemo<EnquiryValue>(
    () => ({
      open,
      prefill,
      session,
      openEnquiry: (next) => {
        setPrefill(next ?? {});
        setSession((current) => current + 1);
        setOpen(true);
      },
      closeEnquiry: () => setOpen(false),
    }),
    [open, prefill, session],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const value = useContext(EnquiryContext);
  if (!value) throw new Error("useEnquiry must be used within EnquiryProvider");
  return value;
}
