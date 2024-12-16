define("DS/UnifiedExportCommand/assets/data/TransferData", [], function () {
  "use strict";
  var transferData = {
    sampletenantsfromserver: function () {
      var platforms = [];
      platforms.push({
        id: "ds-india",
        name: "Dassault Systemes IN",
      });
      platforms.push({
        id: "ds-euw",
        name: "Dassault Systemes EU",
      });
      platforms.push({
        id: "ds-us",
        name: "Dassault Systemes US",
      });
      return {
        platforms: platforms,
      };
    },
    sampledestinations_IN: function () {
      return {
        cspaces: [
          {
            securityContext: "ctx::VPLMProjectLeader.IN-01.Exchange-IN",
            name: "Exchange-IN",
            org: "IN-01",
          },
          {
            securityContext: "ctx::VPLMProjectLeader.IN-01.Exchange-IN",
            name: "Exchange-IN",
            org: "IN-01",
          },
          {
            securityContext: "ctx::VPLMProjectLeader.US-02.Conversion-IN",
            name: "Conversion_IN",
            org: "US-02",
          },
          {
            securityContext: "ctx::VPLMProjectLeader.US-01.Exchange-IN",
            name: "Exchange-IN",
            org: "US-01",
            collaboration: {
              title: "Extended Collaboration-IN",
              collaborationId: "b76aad0c-ba26-4420-a0b0-8627b410094",
            },
          },
        ],
      };
    },
    sampledestinations_US: function () {
      return {
        cspaces: [
          {
            securityContext: "ctx::VPLMProjectLeader.US-01.Exchange-US",
            name: "Exchange-US",
            org: "US-01",
          },
          {
            securityContext: "ctx::VPLMProjectLeader.US-01.Exchange-US",
            name: "Exchange-US",
            org: "US-01",
          },
          {
            securityContext: "ctx::VPLMProjectLeader.US-02.Conversion-US",
            name: "Conversion-US",
            org: "US-02",
          },
          {
            securityContext: "ctx::VPLMProjectLeader.US-01.Exchange-US",
            name: "Exchange-US",
            org: "US-01",
            collaboration: {
              title: "Extended Collaboration-US",
              collaborationId: "b76aad0c-ba26-4420-a0b0-8627b410094",
            },
          },
        ],
      };
    },
    sampledestinations_EU: function () {
      return {
        cspaces: [
          {
            securityContext: "ctx::VPLMProjectLeader.EU-01.Exchange-EU",
            name: "Exchange-EU",
            org: "EU-0x",
          },
          {
            securityContext: "ctx::VPLMProjectLeader.EU-01.Exchange-EU",
            name: "Exchange-EU",
            org: "EU-0y",
          },
          {
            securityContext: "ctx::VPLMProjectLeader.EU-02.Conversion_EU",
            name: "Conversion-EU",
            org: "EU-02",
          },
          {
            securityContext: "ctx::VPLMProjectLeader.EU-01.Exchange-EU",
            name: "Exchange-EU",
            org: "EU-01",
            collaboration: {
              title: "Extended Collaboration-EU",
              collaborationId: "b76aad0c-ba26-4420-a0b0-8627b410094",
            },
          },
        ],
      };
    },
  };
  return transferData;
});
