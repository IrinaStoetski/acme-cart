import { useState } from "react";
import type { Key } from "react-aria-components";
import { DisclosureGroup } from "react-aria-components";
import { AccordionItem } from "./components";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  items?: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
}

const Accordion = ({ className, items }: Props) => {
  const [expandedKeys, setExpandedKeys] = useState(new Set<Key>([items?.[0]?.id || ""]));

  return (
    <div className={twMerge("flex justify-center w-full", className)}>
      <DisclosureGroup
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
        className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
      >
        {items?.map((item) => (
          <AccordionItem key={item.id} id={item.id} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </DisclosureGroup>
    </div>
  );
};

export default Accordion;
