# Routes & Pages

A numbered list of all Next.js App Router pages discovered under `src/app`. Route groups like `(admin)`, `(client)`, `(auth)` are organizational only and do not appear in the URL.

| No | Route Path | Area | File Path |
| --- | --- | --- | --- |
| 1 | `/` | admin | `src/app/(admin)/page.jsx` |
| 2 | `/activity-log` | admin | `src/app/(admin)/activity-log/page.jsx` |
| 3 | `/messages` | admin | `src/app/(admin)/messages/page.jsx` |
| 4 | `/task-calendar` | admin | `src/app/(admin)/task-calendar/page.jsx` |
| 5 | `/tasks-todo` | admin | `src/app/(admin)/tasks-todo/page.jsx` |
| 6 | `/clients` | admin | `src/app/(admin)/clients/page.jsx` |
| 7 | `/clients/add-new-client` | admin | `src/app/(admin)/clients/add-new-client/page.jsx` |
| 8 | `/clients/[id]` | admin | `src/app/(admin)/clients/[id]/page.jsx` |
| 9 | `/commission-ledger` | admin | `src/app/(admin)/commission-ledger/page.jsx` |
| 10 | `/commission-ledger/commission-rules` | admin | `src/app/(admin)/commission-ledger/commission-rules/page.jsx` |
| 11 | `/payments/invoices` | admin | `src/app/(admin)/payments/invoices/page.jsx` |
| 12 | `/payments/records` | admin | `src/app/(admin)/payments/records/page.jsx` |
| 13 | `/payments/records/addNewRecords` | admin | `src/app/(admin)/payments/records/addNewRecords/page.jsx` |
| 14 | `/policies/all` | admin | `src/app/(admin)/policies/all/page.jsx` |
| 15 | `/policies/claims` | admin | `src/app/(admin)/policies/claims/page.jsx` |
| 16 | `/policies/claims/add-new-claim` | admin | `src/app/(admin)/policies/claims/add-new-claim/page.jsx` |
| 17 | `/policies/add-new-opportunity` | admin | `src/app/(admin)/policies/add-new-opportunity/page.jsx` |
| 18 | `/settings` | admin | `src/app/(admin)/settings/page.jsx` |
| 19 | `/settings/company-profile` | admin | `src/app/(admin)/settings/company-profile/page.jsx` |
| 20 | `/user-management/roles` | admin | `src/app/(admin)/user-management/roles/page.jsx` |
| 21 | `/user-management/roles/addNewRole` | admin | `src/app/(admin)/user-management/roles/addNewRole/page.jsx` |
| 22 | `/user-management/team` | admin | `src/app/(admin)/user-management/team/page.jsx` |
| 23 | `/user-management/team/addNewMember` | admin | `src/app/(admin)/user-management/team/addNewMember/page.jsx` |
| 24 | `/auth/login` | auth | `src/app/(auth)/auth/login/page.jsx` |
| 25 | `/auth/register` | auth | `src/app/(auth)/auth/register/page.jsx` |
| 26 | `/auth/forgot-password` | auth | `src/app/(auth)/auth/forgot-password/page.jsx` |
| 27 | `/client/dashboard` | client | `src/app/(client)/client/dashboard/page.jsx` |
| 28 | `/client/claims` | client | `src/app/(client)/client/claims/page.jsx` |
| 29 | `/client/claims/add-new-claims` | client | `src/app/(client)/client/claims/add-new-claims/page.jsx` |
| 30 | `/client/documents` | client | `src/app/(client)/client/documents/page.jsx` |
| 31 | `/client/payments` | client | `src/app/(client)/client/payments/page.jsx` |
| 32 | `/client/policies` | client | `src/app/(client)/client/policies/page.jsx` |
| 33 | `/client/settings` | client | `src/app/(client)/client/settings/page.jsx` |
