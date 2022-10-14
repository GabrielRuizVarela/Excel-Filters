import React from "react";
import * as XLSX from "xlsx";
import { useAppSelector } from "../app/hooks";

export default function FileDisplay() {
  const wb = useAppSelector((state) => state.file.woorkbook);
  return (
    <div>
      {wb ? (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: (XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]])) }} />
        // XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]])
      ) : (
          <div>Not Loaded</div>
      )}
    </div>
  );
}
