import { Heading } from "../../common";

const About = () => {
  return (
    <div>
      <p className="text-center text-primary mb-4">Who we are</p>
      <Heading level={2} className="text-center">
        Welcome to CinemaCrate
      </Heading>
      <Heading level={6} className="text-center mb-8">
        Your Curated Movie Night Awaits!
      </Heading>
      <p className="my-4 text-center text-grey">
        At CinemaCrate, we&apos;re passionate about film and creating
        unforgettable movie nights. We believe the perfect night in deserves a
        curated experience, one that goes beyond simply picking a title from a
        streaming service.
      </p>
      <p className="my-4 text-center text-grey">
        CinemaCrate is more than just movies. It&apos;s about creating memories,
        sparking conversations, and fostering a love for film. We believe that
        movies have the power to transport us, entertain us, and connect us.
        With CinemaCrate, we want to make movie night an experience you&apos;ll
        truly look forward to.
      </p>
      <p className="my-4 text-center text-grey">
        That&apos;s why we offer unique &quot;crates&quot; filled with
        everything you need for a fantastic movie experience. Each standard
        crate includes a movie or series.
      </p>
      <p className="my-4 text-center text-grey">
        For the ultimate cinephiles, we offer premium crates - a monthly or
        yearly subscription that delivers a curated movie or series surprise
        right to your CinemaCrate account, along with exclusive discounts on all
        our standard crates. It&apos;s the gift that keeps on giving, ensuring
        you have a fresh cinematic adventure every month (or year!)
      </p>
    </div>
  );
};

export default About;
