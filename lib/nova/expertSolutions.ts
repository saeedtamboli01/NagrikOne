import type { NovaSolution } from './solutionEngine';

const today = () =>
  new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

const DISCLAIMER =
  '_This is general guidance based on RBI and Indian law, not legal advice. For large amounts, consult a lawyer._';

/** Frozen / blocked bank account */
export function frozenAccountSolution(loc: string): NovaSolution {
  const notice = `Date: ${today()}

To,
The Branch Manager
[Bank Name], [Branch Name], ${loc}

Subject: Request for written reason and release of frozen account No. [Account Number]

Respected Sir/Madam,

1. I hold the above account with your branch. Since [date], I am unable to operate it as it has been frozen/blocked, without any written reason given to me.
2. I request you to provide, within 7 days and in writing: (a) the exact reason for the freeze, (b) the date and the authority or order under which it was placed (bank, police, court, or tax authority, with reference number), and (c) whether the hold covers the entire balance or only a specific disputed amount.
3. If the freeze is for KYC, kindly tell me the exact documents needed. I will submit them immediately.
4. Please release the account or the undisputed balance as early as possible, since I depend on it for [salary / EMI / daily expenses].

If I do not receive a satisfactory reply, I will escalate to your Principal Nodal Officer and then to the RBI Integrated Ombudsman.

Yours faithfully,
[Your Name]
[Mobile] | [Customer ID]`;

  const chatResponseText = `### Frozen Bank Account: Find the Reason First, Then Get It Released

A bank can freeze an account only for a lawful reason. The fix depends entirely on **which reason it is**, so your first job is to find out. You are entitled to ask the bank for it in writing.

**The 5 common reasons:**
- **Police / cyber-cell hold.** Very common today. It happens when someone reports fraud (on 1930 or cybercrime.gov.in) and money you received (UPI, online sale) is traced to your account. Police can place a hold under BNSS Section 106.
- **Court or tax order.** Only that court or authority can lift it.
- **Incomplete KYC.** Aadhaar, PAN or address proof is not updated.
- **Dormant account.** No customer-made transaction for 2 years.
- **Suspicious activity flagged by the bank.**

---

### What to do, step by step

1. **Today: get the reason in writing.** Visit your home branch, meet the manager, and ask for the reason, the date, the ordering authority, and the reference number. Get a stamped receiving copy of your request (draft below).
2. **Match the reason to the fix:**
   - **Police / cyber hold:** ask the bank for the complaint number and police station. Meet the investigating officer with your ID, statements, and proof of where the money came from. Ask them to send a release letter to the bank. Also ask whether the hold covers the full balance or only the disputed amount. If it drags on, a lawyer can apply to the magistrate court for release.
   - **KYC or dormant:** submit fresh ID and address proof at the branch and ask for reactivation. This is usually fixed within days.
   - **Court / tax order:** contact the issuing authority.
3. **If the bank caused it and is not helping:** complain to the bank's Grievance Officer, then the **Principal Nodal Officer**, and keep the complaint number.
4. **After 30 days with no reply or an unsatisfactory one:** file a free complaint at **cms.rbi.org.in** (RBI Integrated Ombudsman). Helpline: **14448**.
5. **Meanwhile:** do not try to move funds around through friends' accounts. That can look like laundering. If salary or EMI is affected, inform your employer and lender in writing.

---

**Key point:** if the account was frozen after you received money from a stranger, treat it as a fraud-related hold and move fast. Gather proof of the genuine source of that money.

${DISCLAIMER}`;

  return {
    headline: 'Frozen Bank Account: Find the Reason First, Then Get It Released',
    legalAssessment:
      'A freeze must have a lawful reason: a police or cyber-cell hold, a court or tax order, incomplete KYC, dormancy, or suspicious activity. Each has a different fix, so get the reason in writing today.',
    immediateActionSteps: [
      'Visit your home branch today and ask in writing for the reason, date, authority and reference number of the freeze.',
      'If it is a police or cyber-cell hold, get the complaint number, meet the investigating officer with your ID and proof of source of funds, and request a release letter.',
      'If it is KYC or dormancy, submit fresh ID and address proof and ask for reactivation.',
      'If the bank does not help, escalate to the Principal Nodal Officer, then to the RBI Integrated Ombudsman after 30 days.'
    ],
    formalNoticeDraft: notice,
    statutoryAuthority: {
      department: 'Bank Branch Manager, Principal Nodal Officer, then RBI Integrated Ombudsman',
      act: 'RBI Integrated Ombudsman Scheme 2021; RBI Master Direction on KYC; BNSS Section 106 (police hold)',
      helpline: '14448 (RBI)',
      slaDays: 30,
      portalUrl: 'https://cms.rbi.org.in'
    },
    evidenceChecklist: [
      'Account number and last 6 months statement',
      'KYC documents (Aadhaar, PAN, address proof)',
      'Any SMS, email or letter from the bank or police about the freeze',
      'Proof of the genuine source of recent credits (salary slips, invoices, sale receipts)',
      'Stamped copy of your written request to the branch'
    ],
    followUpSuggestions: [
      'The bank says it is a police hold. How do I contact the right officer?',
      'Can the bank freeze my whole balance for one disputed transaction?',
      'My salary is stuck. Can I open another account meanwhile?'
    ],
    chatResponseText
  };
}

/** OTP / UPI / online fraud: money lost */
export function onlineFraudSolution(loc: string): NovaSolution {
  const notice = `Date: ${today()}

To,
The Branch Manager / Nodal Officer
[Bank Name], ${loc}

Subject: Report of unauthorised transaction(s) and request for reversal. Account No. [Account Number]

Respected Sir/Madam,

1. I report unauthorised transaction(s) of Rs. [amount] on [date and time], reference/UTR [number], that I did not authorise.
2. I have reported this to the National Cyber Crime Helpline 1930 (acknowledgement no. [number]) and on cybercrime.gov.in.
3. Under the RBI circular on limiting customer liability in unauthorised electronic banking transactions, I request you to block my card/UPI/net banking immediately, investigate, and credit the amount back to my account.
4. Please acknowledge this complaint and share the complaint number.

Yours faithfully,
[Your Name] | [Mobile]`;

  const chatResponseText = `### Online / OTP Fraud: Act in the Next Hour

**Speed decides whether your money can be frozen.** Do these in this order:

1. **Call 1930 right now** (National Cyber Crime Helpline, 24x7). Give the transaction ID, amount, time, and the receiving account or UPI ID. Early reports often let the bank hold the money.
2. **Report online** at **cybercrime.gov.in** and save the acknowledgement number.
3. **Call your bank** and block the card, UPI and net banking. Then send a written complaint (draft below) and take a complaint number.
4. **Stop the damage:** change your banking and UPI passwords, uninstall any screen-sharing or unknown app (AnyDesk, TeamViewer, APK files), and check that your SIM still has signal.
5. **File an FIR** at your local police or cyber police station, with the 1930 acknowledgement.
6. **Escalate** if the bank delays: Nodal Officer, then the RBI Integrated Ombudsman (**cms.rbi.org.in**, helpline **14448**) after 30 days.

---

### Will you get the money back? Be realistic

- Under RBI's customer-liability rules, if the fraud was a **third-party breach** and you report it **within 3 working days**, your liability is generally **zero**.
- If **you shared the OTP or PIN yourself**, the bank may treat it as customer negligence and refuse. It is harder, but you should still report, because the police can freeze the receiving account.
- Never pay anyone who promises to "recover" your money. That is a second scam.

${DISCLAIMER}`;

  return {
    headline: 'Online / OTP Fraud: Immediate Recovery Plan',
    legalAssessment:
      'Reporting within hours to 1930 gives the best chance to freeze the money. RBI rules limit your liability for third-party fraud reported within 3 working days, but sharing an OTP yourself makes recovery harder.',
    immediateActionSteps: [
      'Call 1930 immediately with the transaction ID, amount, time and receiver details.',
      'Report on cybercrime.gov.in and save the acknowledgement number.',
      'Call your bank to block card, UPI and net banking, then send a written complaint the same day.',
      'File an FIR and escalate to the RBI Ombudsman after 30 days if the bank does not reverse the amount.'
    ],
    formalNoticeDraft: notice,
    statutoryAuthority: {
      department: 'National Cyber Crime Helpline, your bank Nodal Officer, RBI Ombudsman',
      act: 'IT Act Section 66D; BNS Section 318 (cheating); RBI circular on limiting customer liability',
      helpline: '1930',
      slaDays: 30,
      portalUrl: 'https://cybercrime.gov.in'
    },
    evidenceChecklist: [
      'Screenshots of the transaction, SMS and call log',
      'Bank statement showing the debit',
      'Transaction ID / UTR and the receiver account or UPI ID',
      '1930 / cybercrime.gov.in acknowledgement number',
      'Details or screenshots of the fraudster\'s number, link or app'
    ],
    followUpSuggestions: [
      'I shared my OTP myself. Can I still claim a refund?',
      'The bank refuses to reverse the amount. What now?',
      'How do I track my cybercrime.gov.in complaint?'
    ],
    chatResponseText
  };
}

/** UPI / bank transaction failed but money debited */
export function upiFailedSolution(loc: string): NovaSolution {
  const chatResponseText = `### Money Debited but Transaction Failed (UPI / Bank)

**First, do not panic.** In most failed-payment cases, the money returns automatically.

1. **Wait one working day.** Under RBI's turnaround-time rules, a failed UPI transaction must be auto-reversed within **T+1** (T = the day of the transaction).
2. **Raise a dispute in the app** (GPay, PhonePe, Paytm and others have a "Help" option on the transaction). Keep the **UTR / transaction ID**.
3. **If not reversed after that:** write to your bank. Banks must pay **compensation of Rs. 100 per day** for delay beyond the limit (RBI TAT framework).
4. **Escalate:** bank Nodal Officer, then the RBI Integrated Ombudsman (**cms.rbi.org.in**, helpline **14448**) if there is no reply in 30 days.

**Check first:** if the money went to the *wrong person*, that is a different case. Contact your bank at once and ask for a recall request, but recovery needs the receiver's consent.

${DISCLAIMER}`;

  return {
    headline: 'Failed Transaction, Money Debited: Reversal and Compensation Path',
    legalAssessment:
      'Failed UPI debits must be reversed within T+1 working day. Banks owe Rs. 100 per day compensation for delays under RBI turnaround-time rules.',
    immediateActionSteps: [
      'Wait one working day for auto-reversal and note the UTR / transaction ID.',
      'Raise a dispute in the payment app and with your bank.',
      'Claim Rs. 100 per day compensation in writing if the reversal is late.',
      'Escalate to the Nodal Officer, then the RBI Integrated Ombudsman after 30 days.'
    ],
    statutoryAuthority: {
      department: 'Your bank / payment app grievance team, then RBI Integrated Ombudsman',
      act: 'RBI circular on harmonisation of turnaround time (TAT) for failed transactions',
      helpline: '14448 (RBI)',
      slaDays: 30,
      portalUrl: 'https://cms.rbi.org.in'
    },
    evidenceChecklist: [
      'Screenshot of the debited transaction and the failure message',
      'UTR / transaction ID',
      'Bank statement showing the debit',
      'Complaint number from the app or bank'
    ],
    followUpSuggestions: [
      'The money went to the wrong person. Can I get it back?',
      'The bank is not paying compensation. What now?'
    ],
    chatResponseText
  };
}
