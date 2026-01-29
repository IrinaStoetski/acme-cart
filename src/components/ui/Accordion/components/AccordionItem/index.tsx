import { Button, Disclosure, DisclosurePanel, Heading } from "react-aria-components";
import { ChevronDown } from "lucide-react";
interface Props {
  id: string;
  title: string;
  children: React.ReactNode;
}

const AccordionItem = ({ id, title, children }: Props) => (
  <Disclosure id={id} className="border-b last:border-b-0 border-gray-200">
    {({ isExpanded }) => (
      <>
        <Heading level={3} className="m-0">
          <Button
            slot="trigger"
            className="flex w-full cursor-pointer items-center justify-between p-4 text-left font-semibold text-gray-700 outline-none hover:bg-gray-50 focus-visible:ring-2 ring-inset ring-blue-500 transition-colors"
          >
            {title}
            <ChevronDown
              size={24}
              className={`text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </Button>
        </Heading>
        <DisclosurePanel
          className={`
              grid! overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out
              ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
            `}
        >
          <div className="min-h-0">
            <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed">{children}</div>
          </div>
        </DisclosurePanel>
      </>
    )}
  </Disclosure>
);

export default AccordionItem;
