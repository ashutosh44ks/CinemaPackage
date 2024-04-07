import { useState, useEffect } from "react";
import { useUserContext } from "../../utils";
import { api, myToast } from "../../utils/";
import { Button, Heading } from "../../common";
import { RiTelegramFill } from "react-icons/ri";
import { Input, TextArea, Checkbox } from "../../common";

const Contact = () => {
  const { loggedUser } = useUserContext();

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const sendMsg = async () => {
    try {
      const { data } = await api.post("/contact", {
        fName,
        lName,
        email,
        mobile: phone,
        message: msg,
      });
      myToast(data.msg, "success");
      setFName("");
      setLName("");
      setEmail("");
      setPhone("");
      setMsg("");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error, "failure");
    }
  };
  const getProfile = async () => {
    try {
      const { data } = await api.get("/getProfile");
      console.log(data);
      if (data?.result?.user?._id) {
        setFName(data.result.user.name.split(" ")[0]);
        setLName(data.result.user.name.split(" ")[1] || "");
        setEmail(data.result.user.email);
        setPhone(data.result.user.mobile);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (loggedUser._id !== "") getProfile();
  }, [loggedUser]);

  const [terms, setTerms] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <p className="text-center text-primary">Contact Us</p>
        <Heading level={2} className="text-center my-4">
          Get in Touch
        </Heading>
        <p className="text-center text-grey">
          We’d love to hear from you. Please fill out this form.
        </p>
      </div>
      <form
        className="my-10 w-full md:w-auto flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          sendMsg();
        }}
      >
        <div className="flex gap-4 flex-col md:flex-row">
          <Input
            label="First Name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            required
          />
          <Input
            label="Last Name"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="text"
            label="Phone"
            value={phone}
            onChange={(e) => {
              let newVal = e.target.value;
              if (!isNaN(newVal) && newVal.length <= 10) setPhone(newVal);
            }}
            required
          />
        </div>
        <div>
          <TextArea
            label="Message"
            rows={5}
            val={msg}
            setVal={setMsg}
            required
          />
        </div>
        <div className="my-4 w-full text-grey">
          <Checkbox
            text={
              <>
                You agree to our{" "}
                <a
                  className="text-primary hover:text-primary2"
                  href="/terms"
                  target="_blank"
                  rel="noreferrer"
                >
                  terms & conditions
                </a>
              </>
            }
            value={terms}
            onChange={(e) => {
              if (e.target.checked) setTerms(false);
              else setTerms(true);
            }}
            required
          />
        </div>
        <div>
          <Button theme="primary" type="submit" className="w-full">
            Send Message
          </Button>
          <button
            className="w-full mt-4 bg-[#1c93e3] text-white flex justify-center items-center gap-2 py-3 rounded-lg font-medium"
            type="button"
            onClick={() => {
              window.open("https://t.me/jordanspicks", "_blank");
            }}
          >
            <RiTelegramFill className="text-2xl" /> Chat with us on Telegram
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
