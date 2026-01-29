import { Flame } from "lucide-react";
import Heading from "../ui/Heading";
import Accordion from "../ui/Accordion";

interface Props {
  data: { title: string; description: string }[];
}

const SpecialOffers = ({ data }: Props) => {
  return (
    <section className="pt-4">
      <Heading className="flex items-center justify-center">
        <Flame className="text-orange-600 mr-2" />
        Special Offers
      </Heading>
      <Accordion
        items={data.map((offer) => ({
          id: offer.title,
          title: offer.title,
          content: (
            <div className="flex flex-col gap-2">
              <p>{offer.description}</p>
            </div>
          ),
        }))}
      />
    </section>
  );
};

export default SpecialOffers;
