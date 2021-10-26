import { DashboardOrderAndTicketFilter } from 'models/Dashboard/DashboardOrderAndTicketFilter';
// import {
//   InternalOrderReport,
//   InternalOrderReportFilter,
// } from "models/InternalOrderReport";
import { InternalOrderFilter } from "models/InternalOrder";
import React from "react";
import { Observable } from "rxjs";

export function useGetData(
  filter?: InternalOrderFilter,
  getTotal?: (filter?: DashboardOrderAndTicketFilter) => Observable<number>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [countOrder, setCountOrder] = React.useState<number>(undefined);

  React.useEffect(() => {
    setLoading(true);
    getTotal(filter).subscribe((res) => {
      if (res !== null && res !== undefined)
        setCountOrder(res);
      setLoading(false);
    });
  }, [filter, getTotal, setLoading]);
  return { countOrder };
}

// export function useGetList(
//   filter?: InternalOrderReportFilter,
//   getList?: (
//     filter?: InternalOrderReportFilter
//   ) => Observable<InternalOrderReport[]>
// ) {
//   const [list, setList] = React.useState<InternalOrderReport[]>([]);
//   React.useEffect(() => {
//     if (
//       filter?.time !== undefined &&
//       filter?.organizationId !== undefined &&
//       filter?.time !== null &&
//       filter?.organizationId !== null
//     ) {
//       getList(filter).subscribe((res) => {
//         setList([...res]);
//       });
//     }
//   }, [filter, getList]);
//   return { list };
// }
