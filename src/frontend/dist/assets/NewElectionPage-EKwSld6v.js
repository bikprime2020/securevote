import { c as createLucideIcon, j as jsxRuntimeExports, t as cn, a as reactExports, v as createSlot, f as useNavigate, h as useActor, s as ue, m as motion, B as Badge, g as Button, o as createActor } from "./index-DqjjyDVW.js";
import { u as useMutation } from "./useMutation-ES2wykDC.js";
import { A as AnimatedPage, S as StaggerContainer, a as StaggerItem, G as GlassCard, c as GlassCardHeader, b as GlassCardContent, e as AnimatePresence } from "./GlassCard-DnRTm3DA.js";
import { P as ProtectedRoute } from "./ProtectedRoute-CSbeIg4V.js";
import { P as Plus } from "./plus-CVAwGBub.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME$1 = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME$1;
var Root$1 = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
let _optCounter = 0;
function makeOpt(val = "") {
  _optCounter += 1;
  return { id: `opt-${_optCounter}`, val };
}
function makeQuestion(id) {
  return {
    id,
    text: "",
    kind: "multipleChoice",
    options: [makeOpt(), makeOpt()]
  };
}
function FieldError({ msg }) {
  if (!msg) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.p,
    {
      initial: { opacity: 0, y: -4 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0 },
      className: "text-xs text-destructive mt-1",
      role: "alert",
      children: msg
    }
  );
}
function QuestionTypePill({
  kind,
  onChange
}) {
  const types = [
    { value: "multipleChoice", label: "Multiple Choice" },
    { value: "yesNo", label: "Yes / No" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-lg overflow-hidden border border-border/40 divide-x divide-border/40", children: types.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => onChange(value),
      className: `px-3 py-1.5 text-xs font-mono transition-smooth ${kind === value ? "bg-primary/20 text-primary font-semibold" : "bg-transparent text-muted-foreground hover:bg-muted/30"}`,
      "data-ocid": `new_election.question_type_${value}`,
      children: label
    },
    value
  )) });
}
function QuestionEditor({
  question,
  index,
  onChange,
  onRemove,
  canRemove,
  errors
}) {
  const uid = reactExports.useId();
  function setKind(kind) {
    onChange({
      ...question,
      kind,
      options: kind === "yesNo" ? [] : [makeOpt(), makeOpt()]
    });
  }
  function setOption(id, val) {
    onChange({
      ...question,
      options: question.options.map((o) => o.id === id ? { ...o, val } : o)
    });
  }
  function addOption() {
    onChange({ ...question, options: [...question.options, makeOpt()] });
  }
  function removeOption(id) {
    onChange({
      ...question,
      options: question.options.filter((o) => o.id !== id)
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8, scale: 0.97 },
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      className: "glass-subtle rounded-xl border border-border/25 p-5 space-y-4",
      "data-ocid": `new_election.question.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs font-mono border-primary/30 text-primary bg-primary/10 px-2",
                children: [
                  "Q",
                  index + 1
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionTypePill, { kind: question.kind, onChange: setKind }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
          canRemove && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              onClick: onRemove,
              whileHover: { scale: 1.1 },
              whileTap: { scale: 0.9 },
              className: "w-7 h-7 flex items-center justify-center rounded-lg text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-smooth",
              "aria-label": "Remove question",
              "data-ocid": `new_election.question.delete_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: `${uid}-text`,
              className: "text-xs font-mono text-muted-foreground mb-1.5 block",
              children: "Question Text"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: `${uid}-text`,
              value: question.text,
              onChange: (e) => onChange({ ...question, text: e.target.value }),
              placeholder: "e.g. Who should lead the committee?",
              className: "glass-subtle border-border/30 focus:border-primary/50",
              "data-ocid": `new_election.question.input.${index + 1}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors[`q${index}_text`] }) })
        ] }),
        question.kind === "multipleChoice" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-mono text-muted-foreground", children: "Answer Options" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: question.options.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              layout: true,
              initial: { opacity: 0, x: -8 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 8, scale: 0.95 },
              transition: { duration: 0.2 },
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground/60 w-5 text-right shrink-0", children: [
                  String.fromCharCode(65 + i),
                  "."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: opt.val,
                    onChange: (e) => setOption(opt.id, e.target.value),
                    placeholder: `Option ${String.fromCharCode(65 + i)}`,
                    className: "glass-subtle border-border/30 focus:border-primary/50 flex-1 h-8 text-sm",
                    "data-ocid": `new_election.question.option.${index + 1}.${i + 1}`
                  }
                ),
                question.options.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    type: "button",
                    onClick: () => removeOption(opt.id),
                    whileHover: { scale: 1.1 },
                    whileTap: { scale: 0.9 },
                    className: "w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth shrink-0",
                    "aria-label": "Remove option",
                    "data-ocid": `new_election.question.remove_option.${index + 1}.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12 })
                  }
                )
              ]
            },
            opt.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors[`q${index}_options`] }) }),
          question.options.length < 8 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              onClick: addOption,
              whileHover: { scale: 1.02 },
              whileTap: { scale: 0.98 },
              className: "flex items-center gap-1.5 text-xs text-primary/80 hover:text-primary font-mono mt-1 transition-smooth",
              "data-ocid": `new_election.question.add_option.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
                "Add option"
              ]
            }
          )
        ] }),
        question.kind === "yesNo" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-1", children: ["Yes", "No"].map((label) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-1 text-center rounded-lg border border-border/30 py-2 text-xs font-mono text-muted-foreground bg-muted/20",
            children: label
          },
          label
        )) })
      ]
    }
  );
}
function validate(title, description, startDT, endDT, questions) {
  const e = {};
  if (!title.trim()) e.title = "Title is required.";
  if (!description.trim()) e.description = "Description is required.";
  if (!startDT) e.startDT = "Start date/time is required.";
  if (!endDT) e.endDT = "End date/time is required.";
  if (startDT && endDT && new Date(endDT) <= new Date(startDT)) {
    e.endDT = "End time must be after start time.";
  }
  if (questions.length === 0)
    e.questions = "At least one question is required.";
  questions.forEach((q, i) => {
    if (!q.text.trim()) e[`q${i}_text`] = "Question text is required.";
    if (q.kind === "multipleChoice") {
      const filled = q.options.filter((o) => o.val.trim());
      if (filled.length < 2)
        e[`q${i}_options`] = "At least 2 options required.";
    }
  });
  return e;
}
function NewElectionForm() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [startDT, setStartDT] = reactExports.useState("");
  const [endDT, setEndDT] = reactExports.useState("");
  const [questions, setQuestions] = reactExports.useState([
    makeQuestion("q-0")
  ]);
  const [counter, setCounter] = reactExports.useState(1);
  const [errors, setErrors] = reactExports.useState({});
  function addQuestion() {
    setQuestions((qs) => [...qs, makeQuestion(`q-${counter}`)]);
    setCounter((c) => c + 1);
  }
  function updateQuestion(i, updated) {
    setQuestions((qs) => qs.map((q, idx) => idx === i ? updated : q));
  }
  function removeQuestion(i) {
    setQuestions((qs) => qs.filter((_, idx) => idx !== i));
  }
  const mutation = useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Not connected");
      return actor.createElection(args);
    },
    onSuccess: () => {
      ue.success("Election created!", {
        description: "Your election is ready and accepting submissions."
      });
      navigate({ to: "/admin" });
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Failed to create election.";
      ue.error("Creation failed", { description: msg });
    }
  });
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(title, description, startDT, endDT, questions);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const args = {
      title: title.trim(),
      description: description.trim(),
      startTime: BigInt(new Date(startDT).getTime()) * 1000000n,
      endTime: BigInt(new Date(endDT).getTime()) * 1000000n,
      questions: questions.map((q) => ({
        text: q.text.trim(),
        questionType: q.kind === "yesNo" ? { __kind__: "yesNo", yesNo: null } : {
          __kind__: "multipleChoice",
          multipleChoice: {
            options: q.options.filter((o) => o.val.trim()).map((o) => o.val)
          }
        }
      }))
    };
    mutation.mutate(args);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedPage, { direction: "up", className: "container py-10 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(StaggerContainer, { staggerDelay: 0.07, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          onClick: () => navigate({ to: "/admin" }),
          whileHover: { x: -2 },
          className: "flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm font-mono mb-4 transition-smooth",
          "data-ocid": "new_election.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 14 }),
            "Back to Dashboard"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -12 },
          animate: { opacity: 1, x: 0 },
          className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle border border-accent/20 text-accent text-xs font-mono mb-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 10 }),
            "New Election"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Create Election" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Fill in the details below to set up a new election on SecureVote." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassCard,
        {
          elevated: true,
          gradient: "primary",
          "data-ocid": "new_election.basic_info.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Basic Information" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "ne-title",
                    className: "text-xs font-mono text-muted-foreground mb-1.5 block",
                    children: [
                      "Election Title ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ne-title",
                    value: title,
                    onChange: (e) => setTitle(e.target.value),
                    placeholder: "e.g. 2026 Board Director Election",
                    className: "glass-subtle border-border/30 focus:border-primary/50",
                    "data-ocid": "new_election.title.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.title }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "ne-desc",
                    className: "text-xs font-mono text-muted-foreground mb-1.5 block",
                    children: [
                      "Description ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "ne-desc",
                    value: description,
                    onChange: (e) => setDescription(e.target.value),
                    placeholder: "Provide voters with context about this election…",
                    rows: 3,
                    className: "glass-subtle border-border/30 focus:border-primary/50 resize-none",
                    "data-ocid": "new_election.description.textarea"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.description }) })
              ] })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, "data-ocid": "new_election.scheduling.panel", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Scheduling" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCardContent, { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "ne-start",
                className: "text-xs font-mono text-muted-foreground mb-1.5 block",
                children: [
                  "Start Date & Time",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ne-start",
                type: "datetime-local",
                value: startDT,
                onChange: (e) => setStartDT(e.target.value),
                className: "glass-subtle border-border/30 focus:border-primary/50",
                "data-ocid": "new_election.start_datetime.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.startDT }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "ne-end",
                className: "text-xs font-mono text-muted-foreground mb-1.5 block",
                children: [
                  "End Date & Time",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ne-end",
                type: "datetime-local",
                value: endDT,
                onChange: (e) => setEndDT(e.target.value),
                className: "glass-subtle border-border/30 focus:border-primary/50",
                "data-ocid": "new_election.end_datetime.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.endDT }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, "data-ocid": "new_election.questions.panel", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs font-mono border-primary/30 text-primary",
                children: [
                  questions.length,
                  " question",
                  questions.length !== 1 ? "s" : ""
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.questions }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: questions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuestionEditor,
            {
              question: q,
              index: i,
              onChange: (updated) => updateQuestion(i, updated),
              onRemove: () => removeQuestion(i),
              canRemove: questions.length > 1,
              errors
            },
            q.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              onClick: addQuestion,
              whileHover: { scale: 1.01 },
              whileTap: { scale: 0.98 },
              className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-primary/30 text-primary/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 text-sm font-mono transition-smooth",
              "data-ocid": "new_election.add_question_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { size: 16 }),
                "Add Question"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/admin" }),
            className: "text-sm text-muted-foreground hover:text-foreground font-mono transition-smooth",
            "data-ocid": "new_election.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: mutation.isPending,
                className: "btn-accent-glow font-display px-8 gap-2 border border-accent/40",
                "data-ocid": "new_election.submit_button",
                children: mutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      animate: { rotate: 360 },
                      transition: {
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear"
                      },
                      className: "w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                    }
                  ),
                  "Creating…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 15 }),
                  "Create Election"
                ] })
              }
            )
          }
        )
      ] }) })
    ] })
  ] }) });
}
function NewElectionPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { requiredRole: "Admin", redirectTo: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NewElectionForm, {}) });
}
export {
  NewElectionPage as default
};
