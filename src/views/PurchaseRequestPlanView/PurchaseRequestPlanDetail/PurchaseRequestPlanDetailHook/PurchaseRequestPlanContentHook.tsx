import { PurchaseRequestPlan } from "models/PurchaseRequestPlan";
import { importExportDataService } from "services/import-export-data-service";

export function PurchaseRequestPlanContentHook(
  model: PurchaseRequestPlan,
  setModel: (data: PurchaseRequestPlan) => void
) {
  const {
    ref,
    handleClick,
    handleImportContentList,
  } = importExportDataService.useImport();

  const {
    handleContentExport,
    handleContentExportTemplate,
  } = importExportDataService.useExport();
}
