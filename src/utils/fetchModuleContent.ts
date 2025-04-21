// utils/fetchModuleContent.ts
export const fetchModuleContent = async (moduleName: string) => {
    try {
      const formattedModuleName = moduleName.replace(/\s+/g, '-');
      const url = `/data/module-${formattedModuleName}-content.json`;
      const res = await fetch(url);
  
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  
      return await res.json();
    } catch (err) {
      console.error("Failed to load module content", err);
      throw new Error("Unable to load content.");
    }
  };
  