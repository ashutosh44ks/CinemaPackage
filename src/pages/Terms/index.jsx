import { Heading } from "../../common";

const Terms = () => {
  return (
    <div>
      <div>
        <Heading level={2}>Terms and Conditions</Heading>
        <section className="my-8">
          <Heading level={4} className="mb-2">
            Cinema Connoisseur Caution <i>(wink wink)</i> User Responsibilities
          </Heading>
          <p>
            Uh oh, looks like you might have a movie marathon addiction! Fear
            not, fellow cinephile, because help is... well, not really a thing
            here. But hey, at least you&apos;re cultured, right?
          </p>
          <p className="mt-2">
            Before diving headfirst into that ten-movie queue, remember to check
            your local blackout curtains. CinemaCrates doesn&apos;t endorse
            breaking any laws in your pursuit of cinematic bliss. You, my
            friend, are the captain of your popcorn-stained ship. CinemaCrates
            is not responsible for any sleep deprivation, significant others
            left on &quot;read&quot;, or spontaneous Oscar acceptance speeches
            delivered to your houseplants. By using this site, you agree to not
            hold us accountable for your thriving film obsession.
          </p>
          <p className="mt-2">
            Important Disclaimer (because lawyers): This site is intended for
            film fanatics of all ages (as long as you can sneak past bedtime or
            convince your parents it&apos;s &quot;educational&quot;).
          </p>
        </section>
        <section className="my-8">
          <Heading level={4} className="mb-2">
            Sure, Give Us All Your Info{" "}
            <i>(We Promise Not to Sell It... Maybe)</i>
          </Heading>
          <p>
            Feeling generous? By entering your precious phone number and email
            address, you&apos;re basically begging us to bombard you with
            informational (read: mostly marketing) texts and emails! Don&apos;t
            worry, replying &quot;STOP&quot; is a breeze (although good luck
            getting us to actually stop). But hey, at least you&apos;ll be the
            first to know when popcorn buckets are on sale! Message and data
            rates may apply (because someone&apos;s gotta pay for all these
            movie recommendations).
          </p>
        </section>
      </div>
      <div>
        <Heading level={2}>Privacy Policy</Heading>
        <section className="my-8">
          <Heading level={4} className="mb-2">
            We See All Your Movies <i>(But We Don&apos;t Care, Really)</i>
          </Heading>
          <p>
            This privacy policy is here for... well, legal reasons mostly. But
            don&apos;t worry, we&apos;re not out to judge your taste in films
            (unless it&apos;s truly atrocious).
          </p>
          <h4 className="mt-4">The Nitty-Gritty</h4>
          <ul className="list-disc pl-4 mt-2">
            <li>
              <span className="font-medium">
                What information do we collect?
              </span>{" "}
              We might gather some basic stuff like your email address if you
              sign up for updates (those award-worthy recommendations, of
              course!). We might also see some anonymous data about the movies
              you browse - you know, for &quot;research purposes&quot; (a.k.a.
              figuring out which SRK movies are most popular).
            </li>
            <li>
              <span className="font-medium">
                What do we do with your information?
              </span>{" "}
              Honestly, not much! We might use your email to send you those
              movie updates (the good stuff, we promise). The anonymous data
              helps us improve the site and, let&apos;s be honest, fuel our
              never-ending movie trivia nights.
            </li>
            <li>
              <span className="font-medium">Do we share your information?</span>{" "}
              Sharing is caring, right? But not really. We won&apos;t sell or
              trade your information with anyone, unless, you know, aliens
              invade and they really need to know your favorite superhero flick
              (doubtful, but hey, gotta cover our bases).
            </li>
          </ul>
          <p className="mt-4">
            <span className="font-medium">
              Look, we get it - privacy is kind of a big deal these days.
            </span>{" "}
            But trust us, we&apos;re more interested in recommending your next
            cinematic masterpiece than becoming your personal stalker (although,
            with your taste in movies, that might be a public service...).
          </p>
          <p className="mt-2">
            <span className="font-medium">
              By using this site, you agree to this privacy policy.
            </span>{" "}
            Basically, you&apos;re cool with us knowing a little bit about your
            movie obsession. Don&apos;t worry, your therapist is safe
            (probably).
          </p>
          <p className="mt-4">
            <span className="font-medium">P.S.</span> If you have any questions
            about this privacy policy, feel free to reach out. We might even
            throw in a free popcorn recipe (because who doesn&apos;t love
            popcorn?).
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
