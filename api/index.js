var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, { context: remixContext, url: request.url, abortDelay: ABORT_DELAY }, void 0, !1, {
        fileName: "app/entry.server.tsx",
        lineNumber: 29,
        columnNumber: 7
      }, this),
      {
        onAllReady() {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, { context: remixContext, url: request.url, abortDelay: ABORT_DELAY }, void 0, !1, {
        fileName: "app/entry.server.tsx",
        lineNumber: 67,
        columnNumber: 7
      }, this),
      {
        onShellReady() {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error), responseStatusCode = 500;
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader
});

// app/static/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-45CGKF4U.css";

// app/root.tsx
var import_react2 = require("@remix-run/react"), import_auth_helpers_remix = require("@supabase/auth-helpers-remix"), import_remix = require("@vercel/remix"), import_react3 = __toESM(require("react")), import_react_bootstrap = require("react-bootstrap"), import_jsx_dev_runtime2 = require("react/jsx-dev-runtime");
import_react3.default.useLayoutEffect = import_react3.default.useEffect;
var links = () => [{ rel: "stylesheet", href: tailwind_default }], loader = async ({ request }) => {
  let env = {
    SUPABASE_URL: process.env.SUPABASE_URL || "",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
    CURRENT_URL: process.env.VERCEL_URL || "http://localhost:3000"
  }, response = new Response(), supabase = (0, import_auth_helpers_remix.createServerClient)(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    request,
    response
  }), {
    data: { session }
  } = await supabase.auth.getSession();
  return (0, import_remix.json)(
    {
      env,
      session
    },
    {
      headers: response.headers
    }
  );
};
function App() {
  let { env, session } = (0, import_react2.useLoaderData)(), { revalidate } = (0, import_react2.useRevalidator)(), [supabase] = (0, import_react3.useState)(() => (0, import_auth_helpers_remix.createBrowserClient)(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)), serverAccessToken = session == null ? void 0 : session.access_token;
  return (0, import_react3.useEffect)(() => {
    let {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session2) => {
      event !== "INITIAL_SESSION" && (session2 == null ? void 0 : session2.access_token) !== serverAccessToken && revalidate();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, revalidate]), /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react_bootstrap.SSRProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 78,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 79,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 80,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 77,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { className: "h-screen font-chivo-mono", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Outlet, { context: { supabase, currentUrl: env.CURRENT_URL } }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 84,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 85,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 86,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 76,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 75,
    columnNumber: 5
  }, this);
}

// app/routes/projects.$id.tsx
var projects_id_exports = {};
__export(projects_id_exports, {
  default: () => Project,
  loader: () => loader2,
  meta: () => meta,
  mockData: () => mockData
});

// app/components/ui/TextField.tsx
var import_clsx = __toESM(require("clsx")), import_react_aria_components = require("react-aria-components"), import_jsx_dev_runtime3 = require("react/jsx-dev-runtime");
function StyledTextField(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react_aria_components.TextField, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react_aria_components.Label, { className: "text-sm text-white", children: props.label }, void 0, !1, {
      fileName: "app/components/ui/TextField.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
      import_react_aria_components.Input,
      {
        className: (0, import_clsx.default)(
          "mt-1 flex h-10 w-full rounded-md border border-zinc-700 bg-transparent px-3 py-2 text-sm font-medium text-slate-50 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-offset-slate-900",
          props.className
        ),
        name: props.name,
        type: props.type,
        placeholder: props.placeholder,
        defaultValue: props.defaultValue,
        autoComplete: props.autoComplete,
        value: props.value,
        onChange: props.onChange
      },
      void 0,
      !1,
      {
        fileName: "app/components/ui/TextField.tsx",
        lineNumber: 22,
        columnNumber: 7
      },
      this
    ),
    props.errorMessage && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react_aria_components.Text, { slot: "errorMessage", className: "mt-1 text-sm text-red-500", children: props.errorMessage }, void 0, !1, {
      fileName: "app/components/ui/TextField.tsx",
      lineNumber: 36,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/ui/TextField.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}

// app/utils/cn.ts
var import_clsx2 = require("clsx"), import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx2.clsx)(inputs));
}

// app/utils/media.ts
var import_path = __toESM(require("path")), allowedTypes = [".jpg", ".jpeg", ".png", ".mp4", ".mp3"], mediaTypesObj = {
  [0 /* IMAGE */]: [".jpg", ".jpeg", ".png"],
  [1 /* VIDEO */]: [".mp4"],
  [2 /* AUDIO */]: [".mp3"]
};
async function createMediaArray(files, mediaUrls, currentUrl) {
  let mediaArray = [];
  for (let file of files) {
    let type = getMediaType(file.name), media = {
      pathName: file.name,
      storageId: file.id,
      url: mediaUrls[file.name],
      type
    };
    1 /* VIDEO */, mediaArray.push(media);
  }
  return mediaArray;
}
function mediaValidator(file) {
  return import_path.default.extname(file.name).toLowerCase() in allowedTypes ? {
    valid: !1,
    code: "file-invalid-type",
    message: `File must be one of the following types: ${allowedTypes.join(", ")}`
  } : { valid: !0 };
}
function getMediaType(fileName) {
  let ext = import_path.default.extname(fileName).toLowerCase();
  if (mediaTypesObj[0 /* IMAGE */].includes(ext))
    return 0 /* IMAGE */;
  if (mediaTypesObj[1 /* VIDEO */].includes(ext))
    return 1 /* VIDEO */;
  if (mediaTypesObj[2 /* AUDIO */].includes(ext))
    return 2 /* AUDIO */;
  throw new Error("Unknown media type");
}
function getMediaUrl(fileName, media) {
  for (let m of media)
    if (m.pathName === fileName)
      return m.url;
  return null;
}

// app/utils/supabase.ts
var import_auth_helpers_remix2 = require("@supabase/auth-helpers-remix"), import_path2 = __toESM(require("path"));
async function getAuthenticatedUser(request, response) {
  let supabaseClient = (0, import_auth_helpers_remix2.createServerClient)(process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "", {
    request,
    response
  }), {
    data: { user }
  } = await supabaseClient.auth.getUser();
  return { user, supabaseClient };
}
async function addProjectToDb(supabaseClient, projectName, userId) {
  let { data, error } = await supabaseClient.from("projects").insert([{ name: projectName, user_id: userId }]).select("id").single();
  return error ? (error.message === 'duplicate key value violates unique constraint "projects_name_key"' && (error.message = "A project with this name already exists"), { error }) : { data };
}
async function getProjectFromDb(supabaseClient, projectId) {
  let { data, error } = await supabaseClient.from("projects").select().eq("id", projectId).single();
  return error ? { error } : { data };
}
async function getMediaFromStorage(supabaseClient, projectId, userId, currentUrl) {
  let { data, error } = await supabaseClient.storage.from("media").list(`${userId}/${projectId}`);
  if (error)
    return { error };
  let filteredFiles = [];
  for (let media of data)
    media.name !== ".emptyFolderPlaceholder" && filteredFiles.push(media);
  let filePathsArray = filteredFiles.map((file) => `${userId}/${projectId}/${file.name}`), createSignedUrlsResult = await supabaseClient.storage.from("media").createSignedUrls(filePathsArray, 86400);
  if (createSignedUrlsResult.error)
    return { error: createSignedUrlsResult.error };
  let signedUrls = {};
  for (let urlData of createSignedUrlsResult.data) {
    if (urlData.error)
      continue;
    let fileName = import_path2.default.basename(urlData.path);
    signedUrls[fileName] = urlData.signedUrl;
  }
  return { data: await createMediaArray(filteredFiles, signedUrls, currentUrl) };
}

// app/components/project/media-library/index.tsx
var import_react6 = require("@remix-run/react"), import_react7 = require("react"), import_react_dropzone = require("react-dropzone");

// app/components/ui/IconButton.tsx
var import_react_aria_components2 = require("react-aria-components"), import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function IconBtn({ onPress, children }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
    import_react_aria_components2.Button,
    {
      onPress,
      className: "rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-2 text-zinc-500 focus:outline-none data-[hovered]:border-zinc-500 data-[pressed]:border-sky-500 data-[hovered]:text-zinc-300",
      children
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/IconButton.tsx",
      lineNumber: 5,
      columnNumber: 5
    },
    this
  );
}

// app/components/project/media-library/header.tsx
var import_lucide_react = require("lucide-react"), import_jsx_dev_runtime5 = require("react/jsx-dev-runtime");
function Header({ onUploadBtnPress, onSearchBtnPress }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h1", { className: "text-white", children: "Media Library" }, void 0, !1, {
      fileName: "app/components/project/media-library/header.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex space-x-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(IconBtn, { onPress: onSearchBtnPress, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_lucide_react.Search, { className: "h-4 w-4" }, void 0, !1, {
        fileName: "app/components/project/media-library/header.tsx",
        lineNumber: 14,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/project/media-library/header.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(IconBtn, { onPress: onUploadBtnPress, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_lucide_react.Upload, { className: "h-4 w-4" }, void 0, !1, {
        fileName: "app/components/project/media-library/header.tsx",
        lineNumber: 17,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/project/media-library/header.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/project/media-library/header.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/project/media-library/header.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}

// app/components/ui/ContextMenu.tsx
var ContextMenuPrimitive = __toESM(require("@radix-ui/react-context-menu")), import_lucide_react2 = require("lucide-react"), React2 = __toESM(require("react"));
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), ContextMenu = ContextMenuPrimitive.Root, ContextMenuTrigger = ContextMenuPrimitive.Trigger;
var ContextMenuSubTrigger = React2.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
  ContextMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_lucide_react2.ChevronRight, { className: "ml-auto h-4 w-4" }, void 0, !1, {
        fileName: "app/components/ui/ContextMenu.tsx",
        lineNumber: 35,
        columnNumber: 5
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/ContextMenu.tsx",
    lineNumber: 25,
    columnNumber: 3
  },
  this
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;
var ContextMenuSubContent = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
  ContextMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md animate-in slide-in-from-left-1",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/ContextMenu.tsx",
    lineNumber: 44,
    columnNumber: 3
  },
  this
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;
var ContextMenuContent = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
  ContextMenuPrimitive.Content,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-800 bg-zinc-900 p-1 text-white shadow-md animate-in fade-in-80",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/ContextMenu.tsx",
    lineNumber: 60,
    columnNumber: 5
  },
  this
) }, void 0, !1, {
  fileName: "app/components/ui/ContextMenu.tsx",
  lineNumber: 59,
  columnNumber: 3
}, this));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;
var ContextMenuItem = React2.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
  ContextMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/ContextMenu.tsx",
    lineNumber: 78,
    columnNumber: 3
  },
  this
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;
var ContextMenuCheckboxItem = React2.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
  ContextMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_lucide_react2.Check, { className: "h-4 w-4" }, void 0, !1, {
        fileName: "app/components/ui/ContextMenu.tsx",
        lineNumber: 105,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/ContextMenu.tsx",
        lineNumber: 104,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/ContextMenu.tsx",
        lineNumber: 103,
        columnNumber: 5
      }, this),
      children
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/ContextMenu.tsx",
    lineNumber: 94,
    columnNumber: 3
  },
  this
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;
var ContextMenuRadioItem = React2.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
  ContextMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_lucide_react2.Circle, { className: "h-2 w-2 fill-current" }, void 0, !1, {
        fileName: "app/components/ui/ContextMenu.tsx",
        lineNumber: 127,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/ContextMenu.tsx",
        lineNumber: 126,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/ContextMenu.tsx",
        lineNumber: 125,
        columnNumber: 5
      }, this),
      children
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/ContextMenu.tsx",
    lineNumber: 117,
    columnNumber: 3
  },
  this
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;
var ContextMenuLabel = React2.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
  ContextMenuPrimitive.Label,
  {
    ref,
    className: cn("text-foreground px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/ContextMenu.tsx",
    lineNumber: 141,
    columnNumber: 3
  },
  this
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;
var ContextMenuSeparator = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(ContextMenuPrimitive.Separator, { ref, className: cn("bg-border -mx-1 my-1 h-px", className), ...props }, void 0, !1, {
  fileName: "app/components/ui/ContextMenu.tsx",
  lineNumber: 153,
  columnNumber: 3
}, this));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;
var ContextMenuShortcut = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: cn("text-muted-foreground ml-auto text-xs tracking-widest", className), ...props }, void 0, !1, {
  fileName: "app/components/ui/ContextMenu.tsx",
  lineNumber: 158,
  columnNumber: 10
}, this);
ContextMenuShortcut.displayName = "ContextMenuShortcut";

// app/components/project/media-library/media-preview.tsx
var import_react5 = require("react");

// app/components/project/media-library/video-preview.tsx
var import_react4 = require("react");

// app/hooks/use-durations-store.tsx
var import_zustand = require("zustand"), useDurationsStore = (0, import_zustand.create)((set) => ({
  durations: {},
  updateDuration: (pathName, duration) => set((state) => ({ durations: { ...state.durations, [pathName]: duration } }))
}));

// app/components/project/media-library/video-preview.tsx
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime");
function VideoPreview({ pathName, src, isHovering }) {
  var _a, _b;
  let ref = (0, import_react4.useRef)(null), [playing, setIsPlaying] = (0, import_react4.useState)(!1), updateDuration = useDurationsStore((state) => state.updateDuration);
  return (0, import_react4.useEffect)(() => {
    ref.current && (ref.current.pause(), ref.current.onloadedmetadata = () => {
      ref.current && updateDuration(pathName, ref.current.duration);
    });
  }, []), isHovering && !playing ? (setIsPlaying(!0), (_a = ref.current) == null || _a.play()) : !isHovering && playing && (setIsPlaying(!1), (_b = ref.current) == null || _b.pause()), /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("video", { loop: !0, preload: "none", ref, muted: !0, onFocus: () => null, onBlur: () => null, autoPlay: !0, children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("source", { src, type: "video/mp4" }, void 0, !1, {
    fileName: "app/components/project/media-library/video-preview.tsx",
    lineNumber: 33,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/project/media-library/video-preview.tsx",
    lineNumber: 32,
    columnNumber: 5
  }, this);
}

// app/components/project/media-library/media-preview.tsx
var import_jsx_dev_runtime8 = require("react/jsx-dev-runtime");
function MediaPreview({ media, addMediaToTimeline }) {
  let [isHovering, setIsHovering] = (0, import_react5.useState)(!1);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(ContextMenu, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(ContextMenuTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
      "div",
      {
        onMouseEnter: () => setIsHovering(!0),
        onMouseLeave: () => setIsHovering(!1),
        className: "group flex w-[6.5rem] cursor-pointer flex-col overflow-hidden",
        onClick: () => addMediaToTimeline(media),
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 group-hover:border-sky-500", children: [
            getMediaType(media.pathName) === 1 /* VIDEO */ ? /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
              VideoPreview,
              {
                pathName: media.pathName,
                src: media.url,
                isHovering
              },
              void 0,
              !1,
              {
                fileName: "app/components/project/media-library/media-preview.tsx",
                lineNumber: 25,
                columnNumber: 15
              },
              this
            ) : null,
            getMediaType(media.pathName) === 0 /* IMAGE */ ? /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("img", { src: media.url, alt: media.pathName, className: "" }, void 0, !1, {
              fileName: "app/components/project/media-library/media-preview.tsx",
              lineNumber: 32,
              columnNumber: 15
            }, this) : null
          ] }, void 0, !0, {
            fileName: "app/components/project/media-library/media-preview.tsx",
            lineNumber: 23,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "mt-1 truncate text-xs text-zinc-400 group-hover:text-zinc-200", children: media.pathName }, void 0, !1, {
            fileName: "app/components/project/media-library/media-preview.tsx",
            lineNumber: 35,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/project/media-library/media-preview.tsx",
        lineNumber: 17,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/project/media-library/media-preview.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(ContextMenuContent, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
        ContextMenuItem,
        {
          className: "cursor-pointer text-zinc-300 hover:text-sky-500",
          onClick: () => window.open(media.url, "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes"),
          children: "Open in new window"
        },
        void 0,
        !1,
        {
          fileName: "app/components/project/media-library/media-preview.tsx",
          lineNumber: 39,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(ContextMenuItem, { className: "cursor-pointer text-zinc-300 hover:text-red-500", children: "Delete" }, void 0, !1, {
        fileName: "app/components/project/media-library/media-preview.tsx",
        lineNumber: 47,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/project/media-library/media-preview.tsx",
      lineNumber: 38,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/project/media-library/media-preview.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}

// app/components/project/media-library/no-media-warning.tsx
var import_lucide_react3 = require("lucide-react"), import_jsx_dev_runtime9 = require("react/jsx-dev-runtime");
function NoMediaWarning() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex h-64 flex-col items-center justify-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "text-4xl text-zinc-500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_lucide_react3.FileWarning, { className: "h-12 w-12" }, void 0, !1, {
      fileName: "app/components/project/media-library/no-media-warning.tsx",
      lineNumber: 7,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/project/media-library/no-media-warning.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "mt-2 text-lg text-zinc-300", children: "No media found" }, void 0, !1, {
      fileName: "app/components/project/media-library/no-media-warning.tsx",
      lineNumber: 9,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "mt-2 text-sm text-zinc-500", children: "Drag and drop files to upload" }, void 0, !1, {
      fileName: "app/components/project/media-library/no-media-warning.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/project/media-library/no-media-warning.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/components/project/media-library/status-bar.tsx
var import_classnames = __toESM(require("classnames")), import_jsx_dev_runtime10 = require("react/jsx-dev-runtime");
function StatusBar({ marginTop, msg }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "absolute z-10", style: { marginTop }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
    "div",
    {
      className: (0, import_classnames.default)(
        "h-fit rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-sm shadow-md",
        msg === "" ? "hidden" : null
      ),
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { className: "text-white", children: msg }, void 0, !1, {
        fileName: "app/components/project/media-library/status-bar.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/project/media-library/status-bar.tsx",
      lineNumber: 9,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/project/media-library/status-bar.tsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}

// app/components/project/media-library/index.tsx
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime");
function MediaLibrary({
  projectId,
  media,
  addMediaToTimeline
}) {
  let navigate = (0, import_react6.useNavigate)(), containerRef = (0, import_react7.useRef)(null), [offsetHeight, setOffsetHeight] = (0, import_react7.useState)(0), [statusBarMsg, setStatusBarMsg] = (0, import_react7.useState)(""), { supabase, currentUrl } = (0, import_react6.useOutletContext)(), [projectMedia, setProjectMedia] = (0, import_react7.useState)(media), hasMedia = projectMedia.length > 0, [showSearchInput, setShowSearchInput] = (0, import_react7.useState)(!1), onDrop = async (acceptedFiles) => {
    let {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth/signin");
      return;
    }
    let filesAdded = 0;
    for (let i = 0; i < acceptedFiles.length; i++) {
      setStatusBarMsg(`Uploading ${i + 1} of ${acceptedFiles.length} files...`);
      let file = acceptedFiles[i], result = mediaValidator(file);
      if (!result.valid) {
        console.log(result.message);
        continue;
      }
      let { data, error } = await supabase.storage.from("media").upload(`${user.id}/${projectId}/${file.name}`, file);
      if (error) {
        console.error(error);
        continue;
      }
      filesAdded++;
    }
    if (setStatusBarMsg(""), filesAdded > 0) {
      let getMediaResult = await getMediaFromStorage(supabase, projectId, user.id, currentUrl);
      getMediaResult.data && setProjectMedia(getMediaResult.data);
    }
  }, { getRootProps, getInputProps, isDragActive, open } = (0, import_react_dropzone.useDropzone)({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
      "video/*": [".mp4"],
      "audio/*": [".mp3"]
    },
    noClick: hasMedia
  });
  return (0, import_react7.useEffect)(() => {
    var _a;
    setOffsetHeight(((_a = containerRef.current) == null ? void 0 : _a.offsetHeight) ?? 0);
  }, [containerRef]), /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
    "div",
    {
      className: cn(
        "flex h-full w-[24.2rem] min-w-[24.2rem] flex-col overflow-auto border border-r border-transparent border-r-zinc-700 bg-zinc-950/95 px-6 py-4",
        isDragActive ? "border border-dashed border-sky-500" : null
      ),
      ...getRootProps(),
      ref: containerRef,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("input", { ...getInputProps() }, void 0, !1, {
          fileName: "app/components/project/media-library/index.tsx",
          lineNumber: 90,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          Header,
          {
            onUploadBtnPress: open,
            onSearchBtnPress: () => {
              setShowSearchInput(!showSearchInput);
            }
          },
          void 0,
          !1,
          {
            fileName: "app/components/project/media-library/index.tsx",
            lineNumber: 91,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(StyledTextField, { className: cn("mt-1", showSearchInput ? null : "hidden"), placeholder: "Search for media..." }, void 0, !1, {
          fileName: "app/components/project/media-library/index.tsx",
          lineNumber: 97,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "mt-4", children: hasMedia ? /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex flex-wrap gap-3", children: projectMedia.map((media2) => /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          MediaPreview,
          {
            media: media2,
            addMediaToTimeline
          },
          media2.storageId,
          !1,
          {
            fileName: "app/components/project/media-library/index.tsx",
            lineNumber: 102,
            columnNumber: 15
          },
          this
        )) }, void 0, !1, {
          fileName: "app/components/project/media-library/index.tsx",
          lineNumber: 100,
          columnNumber: 11
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(NoMediaWarning, {}, void 0, !1, {
          fileName: "app/components/project/media-library/index.tsx",
          lineNumber: 110,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/components/project/media-library/index.tsx",
          lineNumber: 98,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(StatusBar, { msg: statusBarMsg, marginTop: offsetHeight - 80 }, void 0, !1, {
          fileName: "app/components/project/media-library/index.tsx",
          lineNumber: 113,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/project/media-library/index.tsx",
      lineNumber: 82,
      columnNumber: 5
    },
    this
  );
}

// app/components/project/media-player/index.tsx
var import_lucide_react4 = require("lucide-react"), import_react8 = require("react"), import_react_aria_components3 = require("react-aria-components");

// app/hooks/use-timeline-store.tsx
var import_zustand2 = require("zustand"), useTimelineStore = (0, import_zustand2.create)((set) => ({
  currentClipPath: "",
  currentClipId: "",
  updateCurrentClip: (clipPath, clipId) => set(() => ({ currentClipPath: clipPath, currentClipId: clipId }))
}));

// app/components/project/media-player/index.tsx
var import_react_player = __toESM(require("react-player")), import_jsx_dev_runtime12 = require("react/jsx-dev-runtime");
function MediaPlayer({ timelineState, media, endTime }) {
  let videoPlayerRef = (0, import_react8.useRef)(null), [currentClipPath] = useTimelineStore((state) => [state.currentClipPath]), [clipUrl, setClipUrl] = (0, import_react8.useState)("");
  (0, import_react8.useEffect)(() => {
    if (currentClipPath !== "") {
      for (let m of media)
        if (m.pathName === currentClipPath) {
          setClipUrl(m.url);
          return;
        }
    } else
      clipUrl !== "" && setClipUrl("");
  }, [currentClipPath]);
  let [isPlaying, setIsPlaying] = (0, import_react8.useState)(!1), [time, setTime] = (0, import_react8.useState)(0);
  (0, import_react8.useEffect)(() => {
    if (!timelineState.current)
      return;
    let engine = timelineState.current;
    return engine.listener.on("play", () => {
      setIsPlaying(!0);
    }), engine.listener.on("paused", () => setIsPlaying(!1)), engine.listener.on("afterSetTime", ({ time: time2, engine: engine2 }) => {
      var _a;
      setTime(time2);
      let scrubTime = time2;
      (_a = videoPlayerRef.current) == null || _a.seekTo(scrubTime, "seconds");
    }), engine.listener.on("setTimeByTick", ({ time: time2 }) => {
      setTime(time2);
      let scaleWidth = 160, scale = 5, startLeft = 20, autoScrollFrom = 500, left = time2 * (scaleWidth / scale) + startLeft - autoScrollFrom;
      timelineState.current.setScrollLeft(left);
    }), () => {
      !engine || (engine.pause(), engine.listener.offAll());
    };
  }, []);
  let timeRender = (time2) => {
    let float = (parseInt(time2 % 1 * 100 + "") + "").padStart(2, "0"), min = (parseInt(time2 / 60 + "") + "").padStart(2, "0"), second = (parseInt(time2 % 60 + "") + "").padStart(2, "0");
    return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_jsx_dev_runtime12.Fragment, { children: `${min}:${second}.${float.replace("0.", "")}` }, void 0, !1, {
      fileName: "app/components/project/media-player/index.tsx",
      lineNumber: 84,
      columnNumber: 12
    }, this);
  }, onPlayorPauseBtnClick = () => {
    !timelineState.current || (timelineState.current.isPlaying ? timelineState.current.pause() : timelineState.current.play({ autoEnd: !0 }));
  }, [isSSR, setIsSSR] = (0, import_react8.useState)(!0);
  return (0, import_react8.useEffect)(() => {
    setIsSSR(!1);
  }, []), /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "h-full w-full p-4 flex flex-col justify-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "mt-4 mx-auto bg-zinc-950/90 border border-zinc-700", children: isSSR ? null : /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_react_player.default, { ref: videoPlayerRef, playing: isPlaying, url: clipUrl }, void 0, !1, {
      fileName: "app/components/project/media-player/index.tsx",
      lineNumber: 104,
      columnNumber: 25
    }, this) }, void 0, !1, {
      fileName: "app/components/project/media-player/index.tsx",
      lineNumber: 103,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "mx-auto mt-auto px-4 flex h-16 w-[30rem] items-center rounded-md border border-zinc-700 bg-zinc-950/95", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "text-zinc-500 flex-1", children: timeRender(time) }, void 0, !1, {
        fileName: "app/components/project/media-player/index.tsx",
        lineNumber: 107,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "space-x-2 h-16 flex justify-center items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          import_react_aria_components3.Button,
          {
            className: "text-zinc-500 data-[hovered]:text-white data-[pressed]:text-white focus:outline-none",
            onPress: () => timelineState.current.setTime(0),
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_lucide_react4.SkipBack, { className: "h-6 w-6" }, void 0, !1, {
              fileName: "app/components/project/media-player/index.tsx",
              lineNumber: 115,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/project/media-player/index.tsx",
            lineNumber: 111,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          import_react_aria_components3.Button,
          {
            className: "text-zinc-500 data-[hovered]:text-white data-[pressed]:text-white focus:outline-none",
            onPress: onPlayorPauseBtnClick,
            children: isPlaying ? /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_lucide_react4.PauseCircle, { className: "h-6 w-6" }, void 0, !1, {
              fileName: "app/components/project/media-player/index.tsx",
              lineNumber: 121,
              columnNumber: 26
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_lucide_react4.PlayCircle, { className: "h-6 w-6" }, void 0, !1, {
              fileName: "app/components/project/media-player/index.tsx",
              lineNumber: 121,
              columnNumber: 64
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/project/media-player/index.tsx",
            lineNumber: 117,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          import_react_aria_components3.Button,
          {
            className: "text-zinc-500 data-[hovered]:text-white data-[pressed]:text-white focus:outline-none",
            onPress: () => timelineState.current.setTime(endTime),
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_lucide_react4.SkipForward, { className: "h-6 w-6" }, void 0, !1, {
              fileName: "app/components/project/media-player/index.tsx",
              lineNumber: 127,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/project/media-player/index.tsx",
            lineNumber: 123,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/project/media-player/index.tsx",
        lineNumber: 110,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "text-white flex-1" }, void 0, !1, {
        fileName: "app/components/project/media-player/index.tsx",
        lineNumber: 130,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/project/media-player/index.tsx",
      lineNumber: 106,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/project/media-player/index.tsx",
    lineNumber: 102,
    columnNumber: 5
  }, this);
}

// app/components/ui/Button.tsx
var import_react_aria_components4 = require("react-aria-components"), import_jsx_dev_runtime13 = require("react/jsx-dev-runtime");
function Button3({ children, className, disabled = !1, type, onPress }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
    import_react_aria_components4.Button,
    {
      className: cn(
        "bg-sky-500 data-[hovered]:bg-sky-600 rounded-md flex items-center justify-center text-white font-medium disabled:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900",
        className
      ),
      onPress,
      isDisabled: disabled,
      type,
      children
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/Button.tsx",
      lineNumber: 12,
      columnNumber: 5
    },
    this
  );
}

// app/components/project/navbar.tsx
var import_react9 = require("@remix-run/react"), import_lucide_react5 = require("lucide-react"), import_react_aria_components5 = require("react-aria-components"), import_jsx_dev_runtime14 = require("react/jsx-dev-runtime");
function Navbar({ projectName, onExportBtnPress }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "h-16 w-full border-b border-zinc-700 bg-black px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "flex h-full items-center justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react_aria_components5.Link, { className: "flex items-center text-zinc-500 focus:outline-none group data-[hovered]:text-zinc-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react9.Link, { to: "/", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_lucide_react5.ArrowLeft, { className: "h-5 w-5 hover:text-zinc-200" }, void 0, !1, {
        fileName: "app/components/project/navbar.tsx",
        lineNumber: 18,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", { className: "ml-1 font-medium", children: "Back" }, void 0, !1, {
        fileName: "app/components/project/navbar.tsx",
        lineNumber: 19,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/project/navbar.tsx",
      lineNumber: 17,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/project/navbar.tsx",
      lineNumber: 16,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/project/navbar.tsx",
      lineNumber: 14,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "flex ", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react_aria_components5.Link, { className: "text-zinc-500 focus:outline-none data-[hovered]:text-zinc-200 data-[pressed]:text-sky-500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react9.Link, { to: "/", children: "Projects" }, void 0, !1, {
        fileName: "app/components/project/navbar.tsx",
        lineNumber: 25,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/project/navbar.tsx",
        lineNumber: 24,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", { className: "ml-1 mr-2 font-bold text-zinc-500", children: "/" }, void 0, !1, {
        fileName: "app/components/project/navbar.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("h1", { className: "font-medium text-white", children: projectName }, void 0, !1, {
        fileName: "app/components/project/navbar.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/project/navbar.tsx",
      lineNumber: 23,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(Button3, { className: "px-6 py-2", onPress: onExportBtnPress, children: "Export" }, void 0, !1, {
      fileName: "app/components/project/navbar.tsx",
      lineNumber: 31,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/project/navbar.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/project/navbar.tsx",
    lineNumber: 13,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/project/navbar.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}

// app/utils/timeline.ts
function getEndTime(actions) {
  return actions.reduce((acc, cur) => {
    let endTime = cur.end;
    return endTime > acc ? endTime : acc;
  }, 0);
}
function getClipPath(clipName) {
  if (/\(\d+\)$/.test(clipName)) {
    let matches = clipName.match(/\((\d+)\)$/);
    if (matches !== null) {
      let number = parseInt(matches[1]), index = clipName.lastIndexOf(`(${number})`);
      return clipName.slice(0, index).trim();
    }
  }
  return clipName;
}

// app/components/project/timeline/video-clip.tsx
var import_jsx_dev_runtime15 = require("react/jsx-dev-runtime");
function VideoClip({ action: action5, row, splitClip, deleteFromTimeline }) {
  let pathName = getClipPath(action5.id);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_jsx_dev_runtime15.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(ContextMenu, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(ContextMenuTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex h-full cursor-pointer items-center justify-start px-4 bg-purple-700 font-sans", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "text-white", children: action5.id }, void 0, !1, {
      fileName: "app/components/project/timeline/video-clip.tsx",
      lineNumber: 19,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/project/timeline/video-clip.tsx",
      lineNumber: 18,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/project/timeline/video-clip.tsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(ContextMenuContent, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(ContextMenuItem, { className: "cursor-pointer text-zinc-500 hover:text-white", onClick: () => splitClip(action5.id), children: "Split at marker" }, void 0, !1, {
        fileName: "app/components/project/timeline/video-clip.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(ContextMenuItem, { className: "cursor-pointer text-zinc-500 hover:text-red-500", onClick: () => deleteFromTimeline(action5.id, 1 /* VIDEO */), children: "Delete clip" }, void 0, !1, {
        fileName: "app/components/project/timeline/video-clip.tsx",
        lineNumber: 24,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/project/timeline/video-clip.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/project/timeline/video-clip.tsx",
    lineNumber: 16,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/project/timeline/video-clip.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}

// app/routes/projects.$id.tsx
var import_react12 = require("@remix-run/react"), import_remix2 = require("@vercel/remix"), import_react_timeline_editor = require("@xzdarcy/react-timeline-editor"), import_react13 = require("react");

// app/components/project/export-modal.tsx
var import_react10 = require("@headlessui/react"), import_lucide_react6 = require("lucide-react"), import_react11 = require("react"), import_react_aria_components6 = require("react-aria-components");

// app/components/ui/ProgressBar.tsx
var React3 = __toESM(require("react")), ProgressPrimitive = __toESM(require("@radix-ui/react-progress"));
var import_jsx_dev_runtime16 = require("react/jsx-dev-runtime"), Progress = React3.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-zinc-800",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-sky-500 transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      },
      void 0,
      !1,
      {
        fileName: "app/components/ui/ProgressBar.tsx",
        lineNumber: 20,
        columnNumber: 5
      },
      this
    )
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/ProgressBar.tsx",
    lineNumber: 12,
    columnNumber: 3
  },
  this
));
Progress.displayName = ProgressPrimitive.Root.displayName;

// app/components/project/export-modal.tsx
var import_jsx_dev_runtime17 = require("react/jsx-dev-runtime");
function CreateProjectModal(props) {
  let closeModal = () => {
    props.setIsOpen(!1);
  }, updateProgress = () => {
    props.progress < 50 && props.setProgress((progress) => progress + 2);
  };
  return (0, import_react11.useEffect)(() => {
    if (props.isOpen) {
      let id = setInterval(() => updateProgress(), 5e3);
      return () => {
        clearInterval(id);
      };
    }
  }, [props.isOpen]), /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_react10.Transition.Root, { show: props.isOpen, as: import_react11.Fragment, children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_react10.Dialog, { as: "div", className: "relative z-10", onClose: () => null, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
      import_react10.Transition.Child,
      {
        as: import_react11.Fragment,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "fixed inset-0 bg-black bg-opacity-70 transition-opacity" }, void 0, !1, {
          fileName: "app/components/project/export-modal.tsx",
          lineNumber: 46,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/project/export-modal.tsx",
        lineNumber: 37,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "fixed inset-0 z-10 overflow-y-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
      import_react10.Transition.Child,
      {
        as: import_react11.Fragment,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        enterTo: "opacity-100 translate-y-0 sm:scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_react10.Dialog.Panel, { className: "relative transform overflow-hidden rounded-lg bg-zinc-900 ring-1 ring-zinc-400/20 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { children: [
          props.exportUrl !== "" ? /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "absolute right-0 top-0 hidden pr-4 pt-4 sm:block", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
            import_react_aria_components6.Button,
            {
              type: "button",
              className: "rounded-full text-zinc-500 data-[hovered]:text-white focus:outline-none focus:ring-0",
              onPress: closeModal,
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_lucide_react6.X, { className: "h-7 w-7" }, void 0, !1, {
                fileName: "app/components/project/export-modal.tsx",
                lineNumber: 68,
                columnNumber: 23
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/components/project/export-modal.tsx",
              lineNumber: 63,
              columnNumber: 21
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/project/export-modal.tsx",
            lineNumber: 62,
            columnNumber: 45
          }, this) : null,
          /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-700/50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_lucide_react6.Film, { className: "text-sky-500" }, void 0, !1, {
            fileName: "app/components/project/export-modal.tsx",
            lineNumber: 72,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/components/project/export-modal.tsx",
            lineNumber: 71,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "mt-4 text-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_react10.Dialog.Title, { as: "h1", className: "text-base font-medium leading-6 text-white", children: "Exporting Project" }, void 0, !1, {
              fileName: "app/components/project/export-modal.tsx",
              lineNumber: 75,
              columnNumber: 21
            }, this),
            props.exportUrl === "" ? /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_jsx_dev_runtime17.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("p", { className: "text-sm mt-1 text-gray-500", children: "Your project is beginning the rendering process. Don't close out of this page." }, void 0, !1, {
                fileName: "app/components/project/export-modal.tsx",
                lineNumber: 80,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(Progress, { value: props.progress, className: "w-[60%]" }, void 0, !1, {
                fileName: "app/components/project/export-modal.tsx",
                lineNumber: 82,
                columnNumber: 27
              }, this) }, void 0, !1, {
                fileName: "app/components/project/export-modal.tsx",
                lineNumber: 81,
                columnNumber: 25
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/project/export-modal.tsx",
              lineNumber: 79,
              columnNumber: 23
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_jsx_dev_runtime17.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("p", { className: "text-sm mt-1 text-gray-500", children: "Your project is ready to be viewed! Congrats" }, void 0, !1, {
                fileName: "app/components/project/export-modal.tsx",
                lineNumber: 87,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(Button3, { className: "w-full h-12 mt-4", onPress: () => {
                var _a;
                return (_a = window == null ? void 0 : window.open(props.exportUrl, "_blank")) == null ? void 0 : _a.focus();
              }, children: "Download" }, void 0, !1, {
                fileName: "app/components/project/export-modal.tsx",
                lineNumber: 88,
                columnNumber: 25
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/project/export-modal.tsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/project/export-modal.tsx",
            lineNumber: 74,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/project/export-modal.tsx",
          lineNumber: 61,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/components/project/export-modal.tsx",
          lineNumber: 60,
          columnNumber: 15
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/project/export-modal.tsx",
        lineNumber: 51,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/project/export-modal.tsx",
      lineNumber: 50,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/project/export-modal.tsx",
      lineNumber: 49,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/project/export-modal.tsx",
    lineNumber: 36,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/project/export-modal.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
}

// app/routes/projects.$id.tsx
var import_jsx_dev_runtime18 = require("react/jsx-dev-runtime"), mockData = [
  {
    id: "0",
    actions: []
  }
];
async function loader2({ params, request }) {
  let response = new Response(), projectId = params.id, { user, supabaseClient } = await getAuthenticatedUser(request, response);
  if (!user)
    return (0, import_remix2.redirect)("/auth/signin", {
      headers: response.headers
    });
  let getProjectResult = await getProjectFromDb(supabaseClient, projectId);
  if (getProjectResult.error)
    return (0, import_remix2.redirect)("/", {
      headers: response.headers
    });
  let currentUrl = process.env.VERCEL_URL || "http://localhost:3000", getMediaResult = await getMediaFromStorage(supabaseClient, projectId, user.id, currentUrl), media = getMediaResult.data || [];
  return getMediaResult.error && getMediaResult.error.message !== '{"size":0}' ? (console.log(getMediaResult.error), (0, import_remix2.redirect)("/", {
    headers: response.headers
  })) : (0, import_remix2.json)({ project: getProjectResult.data, media, userId: user.id }, { headers: response.headers });
}
var meta = ({ data }) => [{ title: data.project.name }];
function Project() {
  let { project, media, userId } = (0, import_react12.useLoaderData)(), [timelineData, setTimelineData] = (0, import_react13.useState)(mockData), { supabase, currentUrl } = (0, import_react12.useOutletContext)(), timelineState = (0, import_react13.useRef)(), durations = useDurationsStore((state) => state.durations), [currentClipId, updateCurrentClip] = useTimelineStore((state) => [state.currentClipId, state.updateCurrentClip]), [mediaOccurences, setMediaOccurences] = (0, import_react13.useState)(
    media.reduce((acc, curr) => (acc[curr.pathName] = 0, acc), {})
  );
  media.reduce((acc, curr) => (acc[curr.pathName] = 0, acc), {});
  let addMediaToTimeline = async (media2) => {
    let newTimelineData = [...timelineData], videoRowEndTime = getEndTime(timelineData[0].actions), clipName = media2.pathName;
    mediaOccurences[media2.pathName] > 0 && (clipName = `${media2.pathName} (${mediaOccurences[media2.pathName]})`), newTimelineData[0].actions.push({
      id: clipName,
      start: videoRowEndTime,
      end: videoRowEndTime + durations[media2.pathName],
      effectId: "video"
    }), setMediaOccurences({
      ...mediaOccurences,
      [media2.pathName]: mediaOccurences[media2.pathName] + 1
    }), setTimelineData(newTimelineData);
  }, splitClip = (clipId) => {
  }, deleteFromTimeline = async (clipId, mediaType) => {
    if (mediaType === 1 /* VIDEO */) {
      let newTimelineData = [...timelineData], videoRow = newTimelineData[0], newActions = videoRow.actions.filter((action5) => action5.id !== clipId);
      videoRow.actions = newActions, setTimelineData(newTimelineData), currentClipId === clipId && updateCurrentClip("", "");
    }
  }, effects = {
    video: {
      id: "video",
      name: "video",
      source: {
        start: ({ action: action5, engine, isPlaying, time }) => {
          isPlaying && console.log("start", action5);
        },
        enter: ({ action: action5, engine, isPlaying, time }) => {
          console.log("enter", action5), updateCurrentClip(getClipPath(action5.id), action5.id);
        },
        leave: ({ action: action5, engine }) => {
          console.log("leave", action5), updateCurrentClip("", "");
        },
        stop: ({ action: action5, engine }) => {
          console.log("stop", action5);
        }
      }
    }
  }, [exportUrl, setExportUrl] = (0, import_react13.useState)(""), [exportModalOpen, setExportModalOpen] = (0, import_react13.useState)(!1), [progress, setProgress] = (0, import_react13.useState)(5), onExportBtnPress = async () => {
    if (timelineData[0].actions.length < 1)
      return;
    setExportModalOpen(!0);
    let exportData = [];
    for (let action5 of timelineData[0].actions)
      exportData.push({
        fileName: action5.id,
        url: getMediaUrl(action5.id, media),
        start: action5.start,
        end: action5.end
      });
    console.log(JSON.stringify(exportData));
    try {
      let body = await (await fetch("https://k4glrcxzizidezq74q2ufbsrva0xzkqd.lambda-url.us-east-1.on.aws/", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: currentUrl
        },
        body: JSON.stringify(exportData)
      })).json();
      console.log(body.url), setExportUrl(body.url), setProgress(100);
    } catch (error) {
      console.log(error);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "h-full bg-zinc-950/95", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(CreateProjectModal, { isOpen: exportModalOpen, setIsOpen: setExportModalOpen, progress, setProgress, exportUrl }, void 0, !1, {
      fileName: "app/routes/projects.$id.tsx",
      lineNumber: 223,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex h-full flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(Navbar, { projectName: project.name, onExportBtnPress }, void 0, !1, {
        fileName: "app/routes/projects.$id.tsx",
        lineNumber: 225,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "h-full w-full flex-1 overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex h-full w-full", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
          MediaLibrary,
          {
            projectId: project.id,
            media,
            addMediaToTimeline
          },
          void 0,
          !1,
          {
            fileName: "app/routes/projects.$id.tsx",
            lineNumber: 228,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
          MediaPlayer,
          {
            timelineState,
            media,
            endTime: getEndTime(timelineData[0].actions)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/projects.$id.tsx",
            lineNumber: 233,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/projects.$id.tsx",
        lineNumber: 227,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/projects.$id.tsx",
        lineNumber: 226,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "h-[20rem] border-t border-zinc-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
        import_react_timeline_editor.Timeline,
        {
          style: { width: "100%", height: "19.9rem", backgroundColor: "rgb(9 9 11)" },
          onChange: (editorData) => {
            setTimelineData(editorData);
          },
          ref: timelineState,
          editorData: timelineData,
          effects,
          autoScroll: !0,
          gridSnap: !0,
          dragLine: !0,
          getActionRender: (action5, row) => {
            if (action5.effectId === "video")
              return /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(VideoClip, { action: action5, row, splitClip, deleteFromTimeline }, void 0, !1, {
                fileName: "app/routes/projects.$id.tsx",
                lineNumber: 255,
                columnNumber: 24
              }, this);
          }
        },
        void 0,
        !1,
        {
          fileName: "app/routes/projects.$id.tsx",
          lineNumber: 241,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/projects.$id.tsx",
        lineNumber: 240,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/projects.$id.tsx",
      lineNumber: 224,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/projects.$id.tsx",
    lineNumber: 222,
    columnNumber: 5
  }, this);
}

// app/routes/auth.signin.tsx
var auth_signin_exports = {};
__export(auth_signin_exports, {
  action: () => action,
  default: () => SigninPage,
  meta: () => meta2
});

// app/utils/request.server.ts
var import_remix3 = require("@vercel/remix"), badRequest = (data, headers) => (0, import_remix3.json)(data, { status: 400, headers }), unauthorizedRequest = (data, headers) => (0, import_remix3.json)(data, { status: 401, headers });

// app/routes/auth.signin.tsx
var import_react14 = require("@remix-run/react"), import_auth_helpers_remix3 = require("@supabase/auth-helpers-remix"), import_remix4 = require("@vercel/remix"), import_zod = require("zod"), import_jsx_dev_runtime19 = require("react/jsx-dev-runtime"), meta2 = () => [{ title: "Sign in" }], formData = import_zod.z.object({
  email: import_zod.z.string().email("Please enter a valid email address"),
  password: import_zod.z.string().min(1, { message: "Please enter a password" })
});
async function action({ request }) {
  let response = new Response(), form = await request.formData(), fields = {
    email: form.get("email"),
    password: form.get("password")
  }, validation = formData.safeParse(fields), fieldErrors = {};
  if (!validation.success)
    return validation.error.issues.map((issue) => fieldErrors[issue.path[0]] = issue.message), badRequest({ fieldErrors, fields, error: null }, response.headers);
  let supabaseClient = (0, import_auth_helpers_remix3.createServerClient)(process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "", {
    request,
    response
  }), { error } = await supabaseClient.auth.signInWithPassword(fields);
  return error ? unauthorizedRequest({ error: error.message, fields, fieldErrors }, response.headers) : (0, import_remix4.redirect)("/", {
    headers: response.headers
  });
}
function SigninPage() {
  var _a, _b;
  let navigation = (0, import_react14.useNavigation)(), actionData = (0, import_react14.useActionData)(), isLoading = navigation.state !== "idle" && navigation.location.pathname === "/auth/signin";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex h-full bg-zinc-950", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "m-auto text-white bg-zinc-900 w-96 border border-zinc-700 rounded-lg p-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("h1", { className: "text-xl font-bold", children: "Sign in" }, void 0, !1, {
      fileName: "app/routes/auth.signin.tsx",
      lineNumber: 55,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("h2", { className: "text-zinc-400", children: "To continue to video-editor" }, void 0, !1, {
      fileName: "app/routes/auth.signin.tsx",
      lineNumber: 56,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_react14.Form, { method: "post", className: "w-full flex flex-col mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
        StyledTextField,
        {
          label: "Email",
          autoComplete: "email",
          name: "email",
          type: "email",
          className: "mt-1",
          defaultValue: actionData == null ? void 0 : actionData.fields.email,
          errorMessage: (_a = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _a.email
        },
        void 0,
        !1,
        {
          fileName: "app/routes/auth.signin.tsx",
          lineNumber: 58,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
        StyledTextField,
        {
          label: "Password",
          autoComplete: "password",
          name: "password",
          type: "password",
          className: "mt-1",
          defaultValue: actionData == null ? void 0 : actionData.fields.password,
          errorMessage: (_b = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _b.password
        },
        void 0,
        !1,
        {
          fileName: "app/routes/auth.signin.tsx",
          lineNumber: 67,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(Button3, { className: "mt-3 h-12", type: "submit", disabled: isLoading, children: isLoading ? "Submitting..." : "Sign In" }, void 0, !1, {
        fileName: "app/routes/auth.signin.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/auth.signin.tsx",
      lineNumber: 57,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex-col flex", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "text-red-500 text-sm -mt-2 mb-1", children: actionData == null ? void 0 : actionData.error }, void 0, !1, {
        fileName: "app/routes/auth.signin.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "text-sm text-gray-500", children: [
        "Need an account?",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_react14.Link, { className: "text-sky-500 hover:underline", to: "/auth/signup", children: "Click here" }, void 0, !1, {
          fileName: "app/routes/auth.signin.tsx",
          lineNumber: 84,
          columnNumber: 13
        }, this),
        " ",
        "to register"
      ] }, void 0, !0, {
        fileName: "app/routes/auth.signin.tsx",
        lineNumber: 82,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/auth.signin.tsx",
      lineNumber: 80,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/auth.signin.tsx",
    lineNumber: 54,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/auth.signin.tsx",
    lineNumber: 53,
    columnNumber: 5
  }, this);
}

// app/routes/auth.signup.tsx
var auth_signup_exports = {};
__export(auth_signup_exports, {
  action: () => action2,
  default: () => SignupPage,
  meta: () => meta3
});
var import_react15 = require("@remix-run/react"), import_auth_helpers_remix4 = require("@supabase/auth-helpers-remix"), import_remix5 = require("@vercel/remix"), import_zod2 = require("zod"), import_jsx_dev_runtime20 = require("react/jsx-dev-runtime"), meta3 = () => [{ title: "Sign up" }], formData2 = import_zod2.z.object({
  email: import_zod2.z.string().email("Please enter a valid email address"),
  password: import_zod2.z.string().min(1, { message: "Please enter a password" }),
  confirmPassword: import_zod2.z.string().min(1, { message: "Please enter a matching password" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
async function action2({ request }) {
  var _a, _b;
  let response = new Response(), form = await request.formData(), fields = {
    email: form.get("email"),
    password: form.get("password"),
    confirmPassword: form.get("confirmPassword")
  }, validation = formData2.safeParse(fields), fieldErrors = {};
  if (!validation.success)
    return validation.error.issues.map((issue) => fieldErrors[issue.path[0]] = issue.message), badRequest({ fieldErrors, fields, error: null }, response.headers);
  let supabaseClient = (0, import_auth_helpers_remix4.createServerClient)(process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "", {
    request,
    response
  }), { data, error } = await supabaseClient.auth.signUp(fields);
  return error ? unauthorizedRequest({ error: error.message, fields, fieldErrors }, response.headers) : ((_b = (_a = data == null ? void 0 : data.user) == null ? void 0 : _a.identities) == null ? void 0 : _b.length) === 0 ? unauthorizedRequest(
    { error: "Account with matching email already exists", fields, fieldErrors },
    response.headers
  ) : (0, import_remix5.redirect)("/", {
    headers: response.headers
  });
}
function SignupPage() {
  var _a, _b, _c;
  let navigation = (0, import_react15.useNavigation)(), actionData = (0, import_react15.useActionData)(), isLoading = navigation.state !== "idle" && navigation.location.pathname === "/auth/signup";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex h-full bg-zinc-950", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "m-auto text-white bg-zinc-900 w-96 border border-zinc-700 rounded-lg p-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("h1", { className: "text-xl font-bold", children: "Create an Account" }, void 0, !1, {
      fileName: "app/routes/auth.signup.tsx",
      lineNumber: 69,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("h2", { className: "text-zinc-400", children: "To continue to video-editor" }, void 0, !1, {
      fileName: "app/routes/auth.signup.tsx",
      lineNumber: 70,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_react15.Form, { method: "post", className: "w-full flex flex-col mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
        StyledTextField,
        {
          label: "Email",
          autoComplete: "email",
          name: "email",
          type: "email",
          className: "mt-1",
          defaultValue: actionData == null ? void 0 : actionData.fields.email,
          errorMessage: (_a = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _a.email
        },
        void 0,
        !1,
        {
          fileName: "app/routes/auth.signup.tsx",
          lineNumber: 72,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
        StyledTextField,
        {
          label: "Password",
          autoComplete: "password",
          name: "password",
          type: "password",
          className: "mt-1",
          defaultValue: actionData == null ? void 0 : actionData.fields.password,
          errorMessage: (_b = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _b.password
        },
        void 0,
        !1,
        {
          fileName: "app/routes/auth.signup.tsx",
          lineNumber: 81,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
        StyledTextField,
        {
          label: "Confirm Password",
          autoComplete: "password",
          name: "confirmPassword",
          type: "password",
          className: "mt-1",
          defaultValue: actionData == null ? void 0 : actionData.fields.confirmPassword,
          errorMessage: (_c = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _c.confirmPassword
        },
        void 0,
        !1,
        {
          fileName: "app/routes/auth.signup.tsx",
          lineNumber: 90,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(Button3, { className: "mt-3 h-12", type: "submit", disabled: isLoading, children: isLoading ? "Submitting..." : "Create Account" }, void 0, !1, {
        fileName: "app/routes/auth.signup.tsx",
        lineNumber: 99,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/auth.signup.tsx",
      lineNumber: 71,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex-col flex", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("span", { className: "text-red-500 text-sm -mt-2 mb-1", children: actionData == null ? void 0 : actionData.error }, void 0, !1, {
        fileName: "app/routes/auth.signup.tsx",
        lineNumber: 104,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("span", { className: "text-sm text-gray-500", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_react15.Link, { className: "text-sky-500 hover:underline", to: "/auth/signin", children: "Click here" }, void 0, !1, {
          fileName: "app/routes/auth.signup.tsx",
          lineNumber: 107,
          columnNumber: 13
        }, this),
        " ",
        "to sign in"
      ] }, void 0, !0, {
        fileName: "app/routes/auth.signup.tsx",
        lineNumber: 105,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/auth.signup.tsx",
      lineNumber: 103,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/auth.signup.tsx",
    lineNumber: 68,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/auth.signup.tsx",
    lineNumber: 67,
    columnNumber: 5
  }, this);
}

// app/routes/api.export.tsx
var api_export_exports = {};
__export(api_export_exports, {
  action: () => action3
});
var import_remix6 = require("@vercel/remix"), action3 = async ({ request }) => (console.log("OK"), (0, import_remix6.json)({ success: !0 }));

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  action: () => action4,
  default: () => Index,
  loader: () => loader3,
  meta: () => meta4
});

// app/components/navbar/index.tsx
var import_lucide_react9 = require("lucide-react");

// app/components/navbar/user-info.tsx
var import_react18 = require("@remix-run/react"), import_lucide_react8 = require("lucide-react"), import_react19 = require("react"), import_react_aria_components8 = require("react-aria-components");

// app/components/navbar/confirm-signout-modal.tsx
var import_react16 = require("@headlessui/react"), import_lucide_react7 = require("lucide-react"), import_react17 = require("react"), import_react_aria_components7 = require("react-aria-components"), import_jsx_dev_runtime21 = require("react/jsx-dev-runtime");
function ConfirmSignoutModal(props) {
  let closeModal = () => {
    props.setIsOpen(!1);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_react16.Transition.Root, { show: props.isOpen, as: import_react17.Fragment, children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_react16.Dialog, { as: "div", className: "relative z-10", onClose: closeModal, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
      import_react16.Transition.Child,
      {
        as: import_react17.Fragment,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "fixed inset-0 bg-black bg-opacity-50 transition-opacity" }, void 0, !1, {
          fileName: "app/components/navbar/confirm-signout-modal.tsx",
          lineNumber: 29,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/navbar/confirm-signout-modal.tsx",
        lineNumber: 20,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "fixed inset-0 z-10 overflow-y-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
      import_react16.Transition.Child,
      {
        as: import_react17.Fragment,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        enterTo: "opacity-100 translate-y-0 sm:scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_react16.Dialog.Panel, { className: "relative transform overflow-hidden rounded-lg bg-zinc-900 ring-1 ring-zinc-400/20  text-left shadow-xl transition-all max-w-lg", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "px-4 pb-4 pt-5 sm:p-6 sm:pb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "sm:flex sm:items-start", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "flex flex-shrink-0 items-center justify-center rounded-full bg-red-700/20 h-10 w-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_lucide_react7.AlertTriangle, { className: "h-5 w-5 text-red-500" }, void 0, !1, {
              fileName: "app/components/navbar/confirm-signout-modal.tsx",
              lineNumber: 47,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "app/components/navbar/confirm-signout-modal.tsx",
              lineNumber: 46,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_react16.Dialog.Title, { as: "h1", className: "text-base font-medium leading-6 text-white", children: "Sign out" }, void 0, !1, {
                fileName: "app/components/navbar/confirm-signout-modal.tsx",
                lineNumber: 50,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "mt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("p", { className: "text-sm text-zinc-500", children: "Are you sure you want to sign out of your account? You'll need to sign in again to continue using the app." }, void 0, !1, {
                fileName: "app/components/navbar/confirm-signout-modal.tsx",
                lineNumber: 54,
                columnNumber: 25
              }, this) }, void 0, !1, {
                fileName: "app/components/navbar/confirm-signout-modal.tsx",
                lineNumber: 53,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/navbar/confirm-signout-modal.tsx",
              lineNumber: 49,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/navbar/confirm-signout-modal.tsx",
            lineNumber: 45,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/components/navbar/confirm-signout-modal.tsx",
            lineNumber: 44,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "px-4 pb-3 pt-2 sm:flex sm:flex-row-reverse sm:px-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
              import_react_aria_components7.Button,
              {
                type: "button",
                className: "inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm data-[hovered]:bg-red-600 sm:ml-3 sm:w-auto focus:outline-none",
                onPress: props.onSignOut,
                children: "Sign Out"
              },
              void 0,
              !1,
              {
                fileName: "app/components/navbar/confirm-signout-modal.tsx",
                lineNumber: 63,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
              import_react_aria_components7.Button,
              {
                type: "button",
                className: "mt-3 inline-flex w-full justify-center rounded-md bg-zinc-800 px-3 py-2 text-sm text-zinc-500 shadow-sm ring-1 ring-inset ring-zinc-700 data-[hovered]:bg-zinc-800/50 sm:mt-0 sm:w-auto  focus:outline-none",
                onPress: closeModal,
                children: "Cancel"
              },
              void 0,
              !1,
              {
                fileName: "app/components/navbar/confirm-signout-modal.tsx",
                lineNumber: 70,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/components/navbar/confirm-signout-modal.tsx",
            lineNumber: 62,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/navbar/confirm-signout-modal.tsx",
          lineNumber: 43,
          columnNumber: 15
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/navbar/confirm-signout-modal.tsx",
        lineNumber: 34,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/navbar/confirm-signout-modal.tsx",
      lineNumber: 33,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/navbar/confirm-signout-modal.tsx",
      lineNumber: 32,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/navbar/confirm-signout-modal.tsx",
    lineNumber: 19,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/navbar/confirm-signout-modal.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

// app/components/navbar/user-info.tsx
var import_jsx_dev_runtime22 = require("react/jsx-dev-runtime");
function UserInfo({ email }) {
  let { supabase } = (0, import_react18.useOutletContext)(), [confirmSignoutModalOpen, setConfirmSignoutModalOpen] = (0, import_react19.useState)(!1);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_jsx_dev_runtime22.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_react_aria_components8.DialogTrigger, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_react_aria_components8.Button, { className: "py-2 my-2 flex flex-row items-center space-x-3 data-[hovered]:bg-zinc-900/60 data-[pressed]:bg-zinc-900/60 rounded-md px-2 cursor-pointer border border-transparent data-[hovered]:border-zinc-700 data-[pressed]:border-zinc-700 focus:outline-none", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("h1", { className: "text-zinc-500 text-sm font-medium", children: email }, void 0, !1, {
          fileName: "app/components/navbar/user-info.tsx",
          lineNumber: 22,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { className: "h-10 w-10 flex items-center justify-center bg-zinc-800 border border-zinc-500 rounded-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_lucide_react8.User, { className: "text-zinc-500 h-6 w-6" }, void 0, !1, {
          fileName: "app/components/navbar/user-info.tsx",
          lineNumber: 24,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/components/navbar/user-info.tsx",
          lineNumber: 23,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/navbar/user-info.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_react_aria_components8.Popover, { className: "data-[entering]:animate-in data-[entering]:fade-in data-[exiting]:animate-out data-[exiting]:fade-out", children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_react_aria_components8.Dialog, { className: "focus:outline-none bg-zinc-900 border border-zinc-700 w-48 rounded-md shadow-md p-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { className: "flex flex-col space-y-2 text-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(DialogLink, { text: "Profile" }, void 0, !1, {
          fileName: "app/components/navbar/user-info.tsx",
          lineNumber: 30,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(DialogLink, { text: "Settings" }, void 0, !1, {
          fileName: "app/components/navbar/user-info.tsx",
          lineNumber: 31,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
          import_react_aria_components8.Button,
          {
            className: "text-zinc-500 data-[hovered]:text-white text-sm font-medium rounded-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900",
            onPress: () => setConfirmSignoutModalOpen(!0),
            children: "Sign Out"
          },
          void 0,
          !1,
          {
            fileName: "app/components/navbar/user-info.tsx",
            lineNumber: 32,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/navbar/user-info.tsx",
        lineNumber: 29,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/navbar/user-info.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/navbar/user-info.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/navbar/user-info.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
      ConfirmSignoutModal,
      {
        isOpen: confirmSignoutModalOpen,
        setIsOpen: setConfirmSignoutModalOpen,
        onSignOut: async () => {
          await supabase.auth.signOut();
        },
        children: "hi"
      },
      void 0,
      !1,
      {
        fileName: "app/components/navbar/user-info.tsx",
        lineNumber: 42,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/navbar/user-info.tsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}
function DialogLink({ text, href }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_react_aria_components8.Link, { className: "text-zinc-500 data-[hovered]:text-white text-sm font-medium rounded-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900", children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_react18.Link, { to: href, children: text }, void 0, !1, {
    fileName: "app/components/navbar/user-info.tsx",
    lineNumber: 56,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/navbar/user-info.tsx",
    lineNumber: 55,
    columnNumber: 5
  }, this);
}

// app/components/navbar/index.tsx
var import_jsx_dev_runtime23 = require("react/jsx-dev-runtime");
function Navbar2({ email }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "px-16 lg:px-24 justify-between flex items-center w-full bg-black ring-1 ring-zinc-400/20", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "flex text-sky-500 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(import_lucide_react9.Clapperboard, { className: "mr-2 h-7 w-7" }, void 0, !1, {
        fileName: "app/components/navbar/index.tsx",
        lineNumber: 10,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("h1", { className: "font-medium text-xl", children: "video-editor" }, void 0, !1, {
        fileName: "app/components/navbar/index.tsx",
        lineNumber: 11,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/navbar/index.tsx",
      lineNumber: 9,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(UserInfo, { email }, void 0, !1, {
      fileName: "app/components/navbar/index.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/navbar/index.tsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}

// app/components/projects/index.tsx
var import_react20 = require("@remix-run/react"), import_lucide_react10 = require("lucide-react"), import_react_aria_components9 = require("react-aria-components"), import_jsx_dev_runtime24 = require("react/jsx-dev-runtime");
function Projects({ projects, setIsCreateNewProjectModalOpen }) {
  let navigate = (0, import_react20.useNavigate)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex mt-4 gap-4 flex-wrap", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
      import_react_aria_components9.Button,
      {
        onPress: () => setIsCreateNewProjectModalOpen(!0),
        className: "bg-black cursor-pointer w-80 h-52 rounded-lg border border-zinc-800 data-[hovered]:border-zinc-700 data-[pressed]:border-sky-500 focus:outline-none",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex justify-center text-center h-full items-center flex-col text-zinc-500", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_lucide_react10.PlusSquare, { className: "text-zinc-400 h-12 mb-1 w-12" }, void 0, !1, {
            fileName: "app/components/projects/index.tsx",
            lineNumber: 20,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("h1", { className: "text-lg", children: "Add a New Project" }, void 0, !1, {
            fileName: "app/components/projects/index.tsx",
            lineNumber: 21,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/projects/index.tsx",
          lineNumber: 19,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/projects/index.tsx",
        lineNumber: 15,
        columnNumber: 7
      },
      this
    ),
    projects == null ? void 0 : projects.map((project) => /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
      import_react_aria_components9.Button,
      {
        onPress: () => navigate(`/projects/${project.id}`),
        className: "bg-black cursor-pointer w-80 h-52 rounded-lg border border-zinc-800 data-[hovered]:border-zinc-700 data-[pressed]:border-sky-500 focus:outline-none",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex justify-start h-full p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "mt-auto text-left", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("h1", { className: "text-lg text-zinc-200", children: project.name }, void 0, !1, {
            fileName: "app/components/projects/index.tsx",
            lineNumber: 32,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("p", { className: "text-sm text-zinc-500", children: [
            "Last updated at:",
            project.updated_at ? new Date(project.updated_at).toLocaleString() : "Never"
          ] }, void 0, !0, {
            fileName: "app/components/projects/index.tsx",
            lineNumber: 33,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/projects/index.tsx",
          lineNumber: 31,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/components/projects/index.tsx",
          lineNumber: 30,
          columnNumber: 11
        }, this)
      },
      project.id,
      !1,
      {
        fileName: "app/components/projects/index.tsx",
        lineNumber: 25,
        columnNumber: 9
      },
      this
    ))
  ] }, void 0, !0, {
    fileName: "app/components/projects/index.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}

// app/components/projects/create-project-modal.tsx
var import_react21 = require("@headlessui/react"), import_lucide_react11 = require("lucide-react"), import_react22 = require("react"), import_react_aria_components10 = require("react-aria-components"), import_jsx_dev_runtime25 = require("react/jsx-dev-runtime");
function CreateProjectModal2(props) {
  let closeModal = () => {
    props.setIsOpen(!1);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_react21.Transition.Root, { show: props.isOpen, as: import_react22.Fragment, children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_react21.Dialog, { as: "div", className: "relative z-10", onClose: closeModal, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
      import_react21.Transition.Child,
      {
        as: import_react22.Fragment,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "fixed inset-0 bg-black bg-opacity-50 transition-opacity" }, void 0, !1, {
          fileName: "app/components/projects/create-project-modal.tsx",
          lineNumber: 27,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/projects/create-project-modal.tsx",
        lineNumber: 18,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "fixed inset-0 z-10 overflow-y-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
      import_react21.Transition.Child,
      {
        as: import_react22.Fragment,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        enterTo: "opacity-100 translate-y-0 sm:scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_react21.Dialog.Panel, { className: "relative transform overflow-hidden rounded-lg bg-zinc-900 ring-1 ring-zinc-400/20 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "absolute right-0 top-0 hidden pr-4 pt-4 sm:block", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
            import_react_aria_components10.Button,
            {
              type: "button",
              className: "rounded-full text-zinc-500 data-[hovered]:text-white focus:outline-none focus:ring-0",
              onPress: closeModal,
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_lucide_react11.X, { className: "h-7 w-7" }, void 0, !1, {
                fileName: "app/components/projects/create-project-modal.tsx",
                lineNumber: 49,
                columnNumber: 23
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/components/projects/create-project-modal.tsx",
              lineNumber: 44,
              columnNumber: 21
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/projects/create-project-modal.tsx",
            lineNumber: 43,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-700/50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_lucide_react11.PlusSquare, { className: "text-sky-500" }, void 0, !1, {
            fileName: "app/components/projects/create-project-modal.tsx",
            lineNumber: 53,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/components/projects/create-project-modal.tsx",
            lineNumber: 52,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "mt-4 text-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_react21.Dialog.Title, { as: "h1", className: "text-base font-medium leading-6 text-white", children: "Create a New Project" }, void 0, !1, {
              fileName: "app/components/projects/create-project-modal.tsx",
              lineNumber: 56,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("p", { className: "text-sm mt-1 text-gray-500", children: "Enter the name of your project below." }, void 0, !1, {
              fileName: "app/components/projects/create-project-modal.tsx",
              lineNumber: 59,
              columnNumber: 21
            }, this),
            props.children
          ] }, void 0, !0, {
            fileName: "app/components/projects/create-project-modal.tsx",
            lineNumber: 55,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/projects/create-project-modal.tsx",
          lineNumber: 42,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/components/projects/create-project-modal.tsx",
          lineNumber: 41,
          columnNumber: 15
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/projects/create-project-modal.tsx",
        lineNumber: 32,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/projects/create-project-modal.tsx",
      lineNumber: 31,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/projects/create-project-modal.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/projects/create-project-modal.tsx",
    lineNumber: 17,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/projects/create-project-modal.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var import_react23 = require("@remix-run/react"), import_remix7 = require("@vercel/remix"), import_lucide_react12 = require("lucide-react"), import_react24 = require("react"), import_jsx_dev_runtime26 = require("react/jsx-dev-runtime"), meta4 = () => [{ title: "video-editor" }];
async function loader3({ request }) {
  let response = new Response(), { user, supabaseClient } = await getAuthenticatedUser(request, response);
  if (!user)
    return (0, import_remix7.redirect)("/auth/signin", {
      headers: response.headers
    });
  let { data } = await supabaseClient.from("projects").select().order("updated_at", { ascending: !1 });
  return (0, import_remix7.json)(
    { user, projects: data },
    {
      headers: response.headers
    }
  );
}
async function action4({ request }) {
  var _a;
  let response = new Response(), projectName = (await request.formData()).get("projectName");
  if (projectName.length === 0)
    return badRequest({ error: "Please enter a project name" }, response.headers);
  let { user, supabaseClient } = await getAuthenticatedUser(request, response);
  if (!user)
    return (0, import_remix7.redirect)("/auth/signin", {
      headers: response.headers
    });
  let result = await addProjectToDb(supabaseClient, projectName, user.id);
  if (result.error)
    return badRequest({ error: result.error.message }, response.headers);
  let projectId = (_a = result.data) == null ? void 0 : _a.id;
  return (0, import_remix7.redirect)(`/projects/${projectId}`, {
    headers: response.headers
  });
}
function Index() {
  let { user, projects } = (0, import_react23.useLoaderData)(), actionData = (0, import_react23.useActionData)(), [isCreateNewProjectModalOpen, setIsCreateNewProjectModalOpen] = (0, import_react24.useState)(!1), navigation = (0, import_react23.useNavigation)(), isLoading = navigation.state !== "idle" && navigation.location.pathname === "/";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "h-full bg-zinc-950/95", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(Navbar2, { email: user.email || "" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 74,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex flex-col px-16 py-8 lg:px-24", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "w-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h1", { className: "text-2xl text-white", children: "Your Projects" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 79,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-md mt-1 text-zinc-600", children: "View all of your projects below" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 80,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 78,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(Button3, { className: "px-4 py-3 text-sm", onPress: () => setIsCreateNewProjectModalOpen(!0), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(import_lucide_react12.Plus, { className: "-ml-1 -mt-0.5 mr-1" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 84,
            columnNumber: 17
          }, this),
          " New Project"
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 83,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 82,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 77,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(Projects, { setIsCreateNewProjectModalOpen, projects }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(CreateProjectModal2, { isOpen: isCreateNewProjectModalOpen, setIsOpen: setIsCreateNewProjectModalOpen, children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(import_react23.Form, { method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "mt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(StyledTextField, { placeholder: "Enter project name", name: "projectName", className: "text-center" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 94,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 93,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(Button3, { disabled: isLoading, className: "h-10 w-full py-6", type: "submit", children: isLoading ? "Submitting..." : "Create New" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 97,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 96,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "mt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("span", { className: "text-sm text-red-500", children: actionData == null ? void 0 : actionData.error }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 102,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 101,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 92,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 73,
    columnNumber: 5
  }, this);
}

// app/routes/auth.tsx
var auth_exports = {};
__export(auth_exports, {
  default: () => AuthTemplate,
  loader: () => loader4
});
var import_react25 = require("@remix-run/react"), import_remix8 = require("@vercel/remix"), import_jsx_dev_runtime27 = require("react/jsx-dev-runtime");
async function loader4({ request }) {
  let response = new Response(), { user } = await getAuthenticatedUser(request, response);
  return user ? (0, import_remix8.redirect)("/", {
    headers: response.headers
  }) : null;
}
function AuthTemplate() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)(import_react25.Outlet, {}, void 0, !1, {
    fileName: "app/routes/auth.tsx",
    lineNumber: 19,
    columnNumber: 10
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "5a2a5917", entry: { module: "/build/entry.client-G3VEGIEJ.js", imports: ["/build/_shared/chunk-PP5IEDXW.js", "/build/_shared/chunk-PVNF273P.js", "/build/_shared/chunk-4IYZMDEG.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-QRRXQJXO.js", imports: ["/build/_shared/chunk-ZG5LBUJZ.js", "/build/_shared/chunk-XPMRCPZO.js", "/build/_shared/chunk-WENNLJWR.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-IXUOC4JV.js", imports: ["/build/_shared/chunk-ER4FK5S5.js", "/build/_shared/chunk-AMVP333K.js", "/build/_shared/chunk-ITBYHHFK.js", "/build/_shared/chunk-CB34CFAF.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api.export": { id: "routes/api.export", parentId: "root", path: "api/export", index: void 0, caseSensitive: void 0, module: "/build/routes/api.export-ZNQI5OMB.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth": { id: "routes/auth", parentId: "root", path: "auth", index: void 0, caseSensitive: void 0, module: "/build/routes/auth-TYE27TKW.js", imports: ["/build/_shared/chunk-CB34CFAF.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth.signin": { id: "routes/auth.signin", parentId: "routes/auth", path: "signin", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.signin-POG4AOKA.js", imports: ["/build/_shared/chunk-PTKYI6KD.js", "/build/_shared/chunk-AMVP333K.js", "/build/_shared/chunk-ITBYHHFK.js", "/build/_shared/chunk-ZG5LBUJZ.js", "/build/_shared/chunk-XPMRCPZO.js", "/build/_shared/chunk-WENNLJWR.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth.signup": { id: "routes/auth.signup", parentId: "routes/auth", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.signup-7Z5BHWXF.js", imports: ["/build/_shared/chunk-PTKYI6KD.js", "/build/_shared/chunk-AMVP333K.js", "/build/_shared/chunk-ITBYHHFK.js", "/build/_shared/chunk-ZG5LBUJZ.js", "/build/_shared/chunk-XPMRCPZO.js", "/build/_shared/chunk-WENNLJWR.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/projects.$id": { id: "routes/projects.$id", parentId: "root", path: "projects/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/projects.$id-4YULEVQP.js", imports: ["/build/_shared/chunk-ER4FK5S5.js", "/build/_shared/chunk-ITBYHHFK.js", "/build/_shared/chunk-CB34CFAF.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, hmr: void 0, url: "/build/manifest-5A2A5917.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public\\build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !0, unstable_vanillaExtract: !1, v2_errorBoundary: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/projects.$id": {
    id: "routes/projects.$id",
    parentId: "root",
    path: "projects/:id",
    index: void 0,
    caseSensitive: void 0,
    module: projects_id_exports
  },
  "routes/auth.signin": {
    id: "routes/auth.signin",
    parentId: "routes/auth",
    path: "signin",
    index: void 0,
    caseSensitive: void 0,
    module: auth_signin_exports
  },
  "routes/auth.signup": {
    id: "routes/auth.signup",
    parentId: "routes/auth",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: auth_signup_exports
  },
  "routes/api.export": {
    id: "routes/api.export",
    parentId: "root",
    path: "api/export",
    index: void 0,
    caseSensitive: void 0,
    module: api_export_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/auth": {
    id: "routes/auth",
    parentId: "root",
    path: "auth",
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
