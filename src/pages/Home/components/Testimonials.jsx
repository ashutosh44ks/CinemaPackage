import { Heading } from "../../../common";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="my-20">
      <div className="mb-6">
        <Heading level={2} className="text-center mb-2">
          Hear from Our Happy Crate Dwellers!
        </Heading>
        <p className="text-center text-grey">
          Don&apos;t just take our word for it. See what real Cinema Crate
          members are saying about their experience.
        </p>
      </div>
      <div className="flex gap-8 lg:flex-row flex-col">
        <div className="flex items-center gap-6">
          <img
            src="/testimonial1.png"
            alt="testimonial1"
            className="h-48"
          />
          <div>
            <div className="flex items-center gap-2 text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="mt-6 mb-2">
              &quot;Cinema Crate is my movie night lifesaver! Huge selection,
              always find something new to watch. Plus, the app is super easy to
              use!&quot;
            </p>
            <div className="font-medium">Marcus Rhiel Madsen</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <img
            src="/testimonial2.png"
            alt="testimonial1"
            className="h-48"
          />
          <div>
            <div className="flex items-center gap-2 text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="mt-6 mb-2">
              &quot;Binge-worthy shows, classic films, all at my fingertips.
              Cinema Crate subscription is the best entertainment value
              around!&quot;
            </p>
            <div className="font-medium">Corey Stanton</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
