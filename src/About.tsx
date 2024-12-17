import React, {
  useRef,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import RatingComponent from "./components/ui/RatingComponent";

const MyArticle = ({ children }: { children: ReactElement | ReactNode }) => {
  return <article className="mb-8">{children}</article>;
};

const MyHeading = ({ title }: { title: string }) => {
  const title_link = _.kebabCase(title);

  return (
    <h1 id={title_link} className="text-blue-500 font-semibold text-3xl my-4">
      <a href={`#${title_link}`} className="hover:underline">
        {title}
      </a>
    </h1>
  );
};

const MyPara = ({ children }: { children: ReactNode | ReactElement }) => {
  return (
    <p className="text-neutral-600 text-lg tracking-wide leading-7 text-justify">
      {children}
    </p>
  );
};

const AboutPage = (): ReactNode => {
  const ratingRef = useRef<number>(0);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const feedbackTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const requestTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("name") || "David Miller";
    const nameInput = nameInputRef.current;
    if (nameInput) nameInput.value = name;
  }, []);

  const setRating = useCallback((rating: number) => {
    ratingRef.current = rating;
  }, []);

  const submitFeedback = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameInput = nameInputRef.current;
    const feedbackTextarea = feedbackTextareaRef.current;

    if (nameInput && feedbackTextarea) {
      // now fake sending the data
      toast.promise(
        new Promise((resolve, reject) => {
          if (requestTimeoutRef.current) {
            clearTimeout(requestTimeoutRef.current);
            reject("Already a request is running!!");
          }
          requestTimeoutRef.current = setTimeout(() => {
            const index = Math.floor(Math.random() * 10);
            if ([1, 0, 1, 0, 1, 1, 1, 0, 1, 1][index]) resolve(null);
            else reject("Unable to post your feedback!!");
          }, 3000);
        }),
        {
          pending: "Submitting...",
          error: {
            render(data): string {
              console.error(data);
              return data.data as string;
            },
          },
          success: "Received your feedback mate. I respect your opinion 🤗",
        },
        {
          autoClose: 2000,
          closeOnClick: true,
          theme: "light",
        }
      );
    }
  }, []);

  return (
    <section className="lg:px-12 mt-20">
      <MyArticle>
        <MyHeading title="What is this website?" />
        <MyPara>
          Our's is a very simple Front-End only ECommerce Application, built
          with <strong>ReactJS</strong> along with <strong>mock-api</strong> for
          the backend support. This web-app contains a few products, with each
          corresponding with a Product Page. What else? I think that's it!
        </MyPara>
      </MyArticle>

      <MyArticle>
        <MyHeading title="Who is the developer?" />
        <MyPara>
          Why? Is the design too $hitty? Sorry for that, The developer is an
          idiot, but trust me he's a <em>good guy</em>. Wait, who am I? Ohh,
          sorry I am the developer...🤘. Yeaa, you can reach me{" "}
          <Link
            to="https://github.com/krishnamodepalli"
            className="text-blue-500 hover:underline"
            target="_blank"
          >
            here,
          </Link>{" "}
          Or You can ping me with a{" "}
          <Link
            to="mailto:mailaboutlogin@gmail.com"
            className="text-blue-500 hover:underline"
          >
            mail
          </Link>
          .
        </MyPara>
      </MyArticle>

      <MyArticle>
        <MyHeading title="What about a Feedback?" />
        <MyPara>On a scale of 1 to 5, how would you rate this web-app?</MyPara>
        <RatingComponent sendRatingToParent={setRating} />
        <form onSubmit={submitFeedback}>
          <div className="my-4">
            <label className="text-neutral-600 text-lg tracking-wide">
              Your Name:
            </label>
            <br />
            <input
              type="text"
              className="w-80 px-2 text-lg mt-4 py-1 rounded-md outline-offset-2 outline-blue-500 border border-neutral-600"
              required
              ref={nameInputRef}
            />
          </div>
          <div className="my-6">
            <label className="text-neutral-600 text-lg tracking-wide">
              Your Feedback:
            </label>
            <br />
            <textarea
              rows={10}
              cols={100}
              className="border w-full lg:w-auto rounded-md border-neutral-600 p-2 mt-4"
              placeholder="Yea, you could give some good ones uh.."
              required
              ref={feedbackTextareaRef}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xl min-w-40 px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </MyArticle>
    </section>
  );
};

export default AboutPage;
