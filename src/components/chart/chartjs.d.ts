import "chart.js";

declare module "chart.js" {
  interface PluginOptionsByType {
    centerText?: {
      display: boolean;
      text: string;
    };
  }
}
