// "use client";

// import {
//   ArrowUp,
//   ArrowDown,
//   Wallet,
//   BookOpen,
//   Calendar,
//   Plus,
//   Filter,
// } from "lucide-react";

// export default function Sidebar() {
//   const cards = [
//     {
//       title: "Total Credit",
//       desc: "Total amount received in the selected date.",
//       icon: <ArrowUp className="w-6 h-6 text-green-600" />,
//       bg: "bg-green-100",
//     },
//     {
//       title: "Total Debit",
//       desc: "Total amount paid in the selected date.",
//       icon: <ArrowDown className="w-6 h-6 text-red-600" />,
//       bg: "bg-red-100",
//     },
//     {
//       title: "Closing Balance",
//       desc: "Credit - Debit = Closing Balance.",
//       icon: <Wallet className="w-6 h-6 text-blue-600" />,
//       bg: "bg-blue-100",
//     },
//     {
//       title: "Transactions List",
//       desc: "All transactions of the selected date.",
//       icon: <BookOpen className="w-6 h-6 text-purple-600" />,
//       bg: "bg-purple-100",
//     },
//     {
//       title: "Select Date",
//       desc: "Change the date to view transactions.",
//       icon: <Calendar className="w-6 h-6 text-blue-600" />,
//       bg: "bg-blue-100",
//     },
//     {
//       title: "Add Transaction",
//       desc: "Quickly add new credit or debit entry.",
//       icon: <Plus className="w-6 h-6 text-blue-600" />,
//       bg: "bg-blue-100",
//     },
//     {
//       title: "Filter",
//       desc: "Filter transactions by type (Credit/Debit).",
//       icon: <Filter className="w-6 h-6 text-orange-600" />,
//       bg: "bg-orange-100",
//     },
//   ];

//   return (
//     <aside className="hidden lg:block w-[360px] xl:w-[420px] bg-white p-6 xl:p-8 border-l">

//       <h2 className="text-4xl font-bold mb-4">
//         Day Book
//       </h2>

//       <p className="text-slate-500 mb-6 leading-8">
//         A clean and simple Day Book screen to manage your daily transactions.
//       </p>

//       <div className="space-y-4">
//         {cards.map((item) => (
//           <div
//             key={item.title}
//             className="border rounded-3xl p-5 flex gap-4 items-start"
//           >
//             <div
//               className={`w-14 h-14 rounded-full flex items-center justify-center ${item.bg}`}
//             >
//               {item.icon}
//             </div>

//             <div>
//               <h3 className="font-bold text-lg">
//                 {item.title}
//               </h3>

//               <p className="text-slate-500 text-sm mt-1 leading-6">
//                 {item.desc}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 bg-blue-50 border border-blue-100 rounded-3xl p-5">
//         <h3 className="font-bold text-blue-600 mb-4 text-lg">
//           Tech Stack
//         </h3>

//         {/* <ul className="space-y-3 text-sm">
//           <li>✓ Next.js 15</li>
//           <li>✓ Tailwind CSS</li>
//           <li>✓ MongoDB</li>
//           <li>✓ Mongoose</li>
//           <li>✓ TypeScript</li>
//         </ul> */}
//       </div>
//     </aside>
//   );
// }