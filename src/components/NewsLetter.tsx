import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaDiscord } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {useState} from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function NewsLetter() {
  useGSAP(() => {
    gsap.from(".news", {
      opacity: 0,
      translateY: 50,
      duration: 1,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".news",
        start: "top 80%",
      },
      ease: "back.out",
    });
  }, []);

  const [formData, setFormData] = useState({email: ''});
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;

    // Manually convert FormData to URLSearchParams
    const formData = new FormData(form);
    const formParams = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      formParams.append(key, value.toString());
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formParams,
    })
        .then(() => alert("Form submission successful!"))
        .catch((error) => alert("Form submission error: " + error));
  };

  return (
    <section className="justify-start pt-36" id="subscribe">
      <div className="py-14 lg:pl-20 md:pl-14 w-full md:w-fit">
        <h3 className="news">
          Sign-up for early access
        </h3>
        <p className="news md:text-lg my-5">
          To sign-up for early access, please join our waiting list and discord group.
        </p>
        <div className="flex sm:flex-row gap-2 items-center mt-5 mb-10">
          <form
            name="waitinglist"
            method="POST"
            className="flex sm:flex-row gap-2 items-center mt-5 mb-10"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-gray-300 text-sm"
            />
            <button
              type="submit"
              className="text-white px-8 py-4 rounded-full bg-primary hover:bg-black transition-colors ease-linear duration-300"
            >
              Join waiting list
            </button>
            <span className="text-gray-500 text-sm mx-2">and</span>
            <Link
              to="https://discord.gg/kyxqWFKMCF"
              target={"_blank"}
              className="w-full sm:w-auto text-white flex gap-2 px-8 py-4 rounded-full bg-primary hover:bg-black transition-colors ease-linear duration-300 heading"
            >
              <span className="lg:text-base text-sm">Join our discord</span> <FaDiscord size={"22px"} />
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
