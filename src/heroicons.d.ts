declare module "@heroicons/react/outline" {
  export { SunIcon, MoonIcon } from "@heroicons/react/outline";
  // Add other exported icons if needed
}

declare module "@heroicons/react/solid" {
  import { ComponentType } from "react";

  export const AcademicCapIcon: ComponentType<React.SVGProps<SVGSVGElement>>;
  export const AdjustmentsIcon: ComponentType<React.SVGProps<SVGSVGElement>>;
  // ... (add other icons as needed)

  // You may need to include all icons that your project uses.
}
