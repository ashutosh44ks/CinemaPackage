import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Heading } from "../../common";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const Faq = () => {
  const navigate = useNavigate();

  const accordianData = [
    {
      title: "What are crates?",
      content:
        "Depending on the crates these can be single or multiple movies/series carefully chosen by our team at CinemaCrates.",
    },
    {
      title: "From where can I view the purchased crate's content?",
      content: (
        <>
          After purchasing a crate you can see the link to the content in{" "}
          <Link className="text-primary hover:text-primary" to="/my-account">
            Your Account
          </Link>
        </>
      ),
    },
    {
      title: "How do I pay for these crates?",
      content:
        "You can pay for your crate with any major credit card. We recommend using Stripe to make sure your payment is safe, however, you're free to choose from our many options.",
    },
    {
      title: "What if I paid but didn't get the crate?",
      content:
        "If this happens, please contact us. We'll sort it out as soon as we can. It would be helpful if you could send us the URL you were sent to after making the payment.",
    },
    {
      title: "How can I change my email address?",
      content:
        "To change your email, please get in touch with us. We'll check your identity and then update your email address.",
    },
  ];
  const [active, setActive] = useState(-1);

  return (
    <div>
      <div>
        <p className="text-center text-primary">Frequently asked questions</p>
        <Heading level={2} className="text-center font-medium my-4">
          Everything you need to know.
        </Heading>
      </div>
      <div className="my-10">
        {accordianData.map((item, index) => (
          <>
            <div key={index} className="my-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => {
                  if (active === index) setActive(-1);
                  else setActive(index);
                }}
              >
                <Heading level={4} className="py-1">
                  {item.title}
                </Heading>
                <span className="text-2xl">
                  {active === index ? (
                    <AiOutlineMinusCircle className="text-primary" />
                  ) : (
                    <AiOutlinePlusCircle className="text-primary" />
                  )}
                </span>
              </div>
              <p
                className={`${
                  active === index ? "max-h-screen" : "max-h-0"
                } overflow-hidden ease-in-out duration-500`}
              >
                {item.content}
              </p>
            </div>
            {index !== accordianData.length - 1 && (
              <hr className="my-4" key={index} />
            )}
          </>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center my-10">
        <img src="/avatar-grp.png" alt="avatar" />
        <div className="my-6">
          <h5 className="text-center text-primary mb-2">
            Still have questions?
          </h5>
          <p className="text-center">
            Can&apos;t find the answer you&apos;re looking for? Please chat to
            our professional team.
          </p>
        </div>
        <Button
          theme="primary"
          size="md-rect"
          onClick={() => {
            navigate("/contact-us");
          }}
        >
          Get in Touch
        </Button>
      </div>
    </div>
  );
};

export default Faq;
