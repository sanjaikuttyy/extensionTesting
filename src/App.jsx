import { useState } from "react";
import "./App.css";

function App() {
  const [showSummarizeOptions, setShowSummarizeOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSummarizeActive, setIsSummarizeActive] = useState(true);
  const [buttonText, setButtonText] = useState("Start Plan");
  const [selectedLength, setSelectedLength] = useState("Small");
  const [noCredits, setNoCredits] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("Annual");
  const delayTime = 2000;
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);

  const handleSummarizeClick = () => {
    setIsSummarizeActive(true);
    setShowSummarizeOptions(!showSummarizeOptions);
  };

  const handleTranscriptClick = () => {
    setIsSummarizeActive(false);
    setShowSummarizeOptions(false);
  };

  const handleCheckbox1Change = (e) => {
    setCheckbox1Checked(e.target.checked);
  };

  const handleCheckbox2Change = (e) => {
    setCheckbox2Checked(e.target.checked);
  };

  const handleCredits = () => {
    setNoCredits(false);
    setButtonText("Summarize this video");
  };

  const getCombinedData = () => {
    return [
      {
        option: "Length",
        value: selectedLength,
      },
      {
        option: "Insightful Summary",
        value: checkbox1Checked,
      },
      {
        option: "Time stamped Summary",
        value: checkbox2Checked,
      },
    ];
  };

  const handleSubmit = () => {
    const combinedData = getCombinedData();
    console.log(combinedData);
  };

  function IconUp() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="5"
        viewBox="0 0 9 5"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.78033 4.79079C8.48743 5.06974 8.01256 5.06974 7.71967 4.79079L4.49999 1.72442L1.28031 4.79079C0.987433 5.06974 0.512532 5.06974 0.219657 4.79079C-0.0732183 4.51184 -0.0732183 4.05957 0.219657 3.78064L3.96966 0.209197C4.26254 -0.0697327 4.73744 -0.0697327 5.03032 0.209197L8.78033 3.78064C9.07322 4.05957 9.07322 4.51184 8.78033 4.79079Z"
          fill="#212121"
        />
      </svg>
    );
  }

  function IconDown() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="5"
        viewBox="0 0 9 5"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.219668 0.209208C0.512566 -0.069736 0.987437 -0.069736 1.28033 0.209208L4.50001 3.27558L7.71969 0.209208C8.01257 -0.069736 8.48747 -0.069736 8.78034 0.209208C9.07322 0.488159 9.07322 0.940432 8.78034 1.21936L5.03034 4.7908C4.73746 5.06973 4.26256 5.06973 3.96968 4.7908L0.219668 1.21936C-0.0732226 0.940432 -0.0732226 0.488159 0.219668 0.209208Z"
          fill="#212121"
        />
      </svg>
    );
  }

  const handleClick = async () => {
    setLoading(true);
    setButtonText("Summarizing...");

    setTimeout(async () => {
      try {
        // Define the URL of your backend endpoint
        const backendUrl =
          "https://ac03ef0e-3682-40ad-932e-2cfba964e8d2-00-yyzq9hx0a7nv.pike.replit.dev/get_transcript";

        // Get the YouTube URL from your state or a form input
        const youtubeUrl = "https://www.youtube.com/watch?v=VYD0To21FB0"; // Replace with actual YouTube URL

        const response = await fetch(backendUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add other headers as required
          },
          body: JSON.stringify({
            youtube_url: youtubeUrl, // Send the YouTube URL in the request body
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // Process the response data as needed
        // For example, update your state with the received transcript data
        console.log(data); // Log the data or update state here
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }

      setLoading(false);
      setButtonText("Summarize this video");
    }, delayTime); // delayTime should be defined somewhere in your code
  };

  return (
    <>
      <div className="container">
        <div>
          <div
            className="boxFirst"
            style={{ width: "404px", height: "35px", flexShrink: "0" }}
          >
            <div className="planBox">
              <p className="creditText">✨5/30 credits left this month.</p>
              <p className="upgradeButton">Upgrade Now</p>
            </div>
          </div>
          <div className="actionBar">
            <div className="toggleBox">
              <div className="toggle-container">
                <div style={{ width: "140px" }}>
                  <button
                    className={`toggle-btn ${
                      isSummarizeActive ? "active" : ""
                    }`}
                    id="summarize-btn"
                    onClick={handleSummarizeClick}
                  >
                    🤯 Summarise
                    <span className="arrowIcon">
                      {showSummarizeOptions ? <IconUp /> : <IconDown />}
                    </span>
                  </button>
                </div>
                <button
                  className={`toggle-btn ${!isSummarizeActive ? "active" : ""}`}
                  id="transcript-btn"
                  onClick={handleTranscriptClick}
                >
                  ✍🏼 Transcript
                </button>
              </div>
              {showSummarizeOptions && (
                <div className="summarizeOption">
                  <div className="checkbox-container">
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="checkbox1"
                        name="checkbox1"
                        checked={checkbox1Checked}
                        onChange={handleCheckbox1Change}
                      />
                      <label htmlFor="checkbox1">Insightful Summary</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="checkbox2"
                        name="checkbox2"
                        checked={checkbox2Checked}
                        onChange={handleCheckbox2Change}
                      />
                      <label htmlFor="checkbox2">Time stamped Summary</label>
                    </div>
                  </div>

                  <div className="length-container">
                    <div style={{ width: "100px" }}>
                      <label className="sumLength" htmlFor="length">
                        Length of summary
                      </label>
                    </div>
                    <div className="toggle-length-container">
                      <button
                        className={`length-btn ${
                          selectedLength === "Small" ? "active" : ""
                        }`}
                        id="small-btn"
                        onClick={() => setSelectedLength("Small")}
                      >
                        Small
                      </button>
                      <button
                        className={`length-btn ${
                          selectedLength === "Medium" ? "active" : ""
                        }`}
                        id="med-btn"
                        onClick={() => setSelectedLength("Medium")}
                      >
                        Medium
                      </button>
                      <button
                        className={`length-btn ${
                          selectedLength === "Large" ? "active" : ""
                        }`}
                        id="large-btn"
                        onClick={() => setSelectedLength("Large")}
                      >
                        Large
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="actionIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
              >
                <path
                  d="M8.17143 4.64287H1.11429C0.495238 4.64287 0 5.13811 0 5.75715V12.8298C0 13.4333 0.495238 13.9441 1.11429 13.9441H8.1869C8.79048 13.9441 9.30119 13.4488 9.30119 12.8298V5.75715C9.28571 5.13811 8.79048 4.64287 8.17143 4.64287ZM8.35714 12.8143C8.35714 12.9072 8.27976 12.9845 8.1869 12.9845H1.11429C1.02143 12.9845 0.944048 12.9072 0.944048 12.8143V5.75715C0.944048 5.6643 1.02143 5.58692 1.11429 5.58692H8.1869C8.27976 5.58692 8.35714 5.6643 8.35714 5.75715V12.8143Z"
                  fill="#A6A6A6"
                />
                <path
                  d="M11.8858 0H4.82864C4.20959 0 3.71436 0.495238 3.71436 1.11429V3.71429H4.64293V1.11429C4.64293 1.02143 4.72031 0.944048 4.81316 0.944048H11.8858C11.9786 0.944048 12.056 1.02143 12.056 1.11429V8.1869C12.056 8.27976 11.9786 8.35714 11.8858 8.35714H10.2144V9.28571H11.8858C12.4894 9.28571 13.0001 8.79048 13.0001 8.17143V1.11429C13.0001 0.495238 12.5048 0 11.8858 0Z"
                  fill="#A6A6A6"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.44256 8.28948C1.95522 8.77735 1.68145 9.43914 1.68145 10.1292C1.68145 10.8192 1.95522 11.481 2.44256 11.9689C2.92989 12.4568 3.59086 12.731 4.28004 12.731C4.6213 12.731 4.95921 12.6636 5.27448 12.5329C5.58979 12.4022 5.87622 12.2105 6.11751 11.9689L7.57676 10.5079C7.90506 10.1792 8.43732 10.1792 8.76571 10.5079C9.09401 10.8367 9.09401 11.3696 8.76571 11.6984L7.30646 13.1593C6.90905 13.5572 6.43724 13.8729 5.91792 14.0882C5.39867 14.3036 4.84211 14.4145 4.28004 14.4145C3.14491 14.4145 2.05626 13.9629 1.2536 13.1593C0.450931 12.3556 0 11.2657 0 10.1292C0 8.99267 0.450931 7.90269 1.2536 7.09899L2.71277 5.63806C3.0411 5.30935 3.57341 5.30934 3.90174 5.63806C4.23006 5.96676 4.23006 6.49975 3.90174 6.82846L2.44256 8.28948Z"
                  fill="#A6A6A6"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.9546 6.12501C12.442 5.63705 12.7157 4.97529 12.7157 4.28526C12.7157 3.59523 12.442 2.93346 11.9546 2.44554C11.4673 1.95761 10.8063 1.6835 10.1171 1.6835C9.77585 1.6835 9.43796 1.75079 9.12269 1.88154C8.80742 2.01229 8.52098 2.20394 8.27961 2.44553L6.82045 3.90649C6.49215 4.23521 5.9598 4.23521 5.6315 3.90649C5.30317 3.57777 5.30317 3.0448 5.6315 2.71608L7.09066 1.25512C7.48816 0.857202 7.95997 0.541547 8.4792 0.326194C8.99852 0.110841 9.55508 0 10.1171 0C11.2522 0 12.3409 0.45148 13.1436 1.25512C13.9463 2.05876 14.3971 3.14874 14.3971 4.28526C14.3971 5.42178 13.9463 6.51179 13.1436 7.31541L11.6844 8.77635C11.3561 9.10505 10.8237 9.10505 10.4954 8.77635C10.1671 8.44765 10.1671 7.91465 10.4954 7.58595L11.9546 6.12501Z"
                  fill="#A6A6A6"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.65884 9.75023C4.33052 9.42153 4.33052 8.88853 4.65884 8.55983L8.54997 4.66393C8.87827 4.33521 9.41062 4.33521 9.73892 4.66393C10.0673 4.99265 10.0673 5.52558 9.73892 5.85437L5.8478 9.75023C5.5195 10.0789 4.98716 10.0789 4.65884 9.75023Z"
                  fill="#A6A6A6"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="12"
                viewBox="0 0 17 12"
                fill="none"
              >
                <line
                  y1="1.25"
                  x2="17"
                  y2="1.25"
                  stroke="#A6A6A6"
                  stroke-width="1.5"
                />
                <line
                  y1="6.25"
                  x2="17"
                  y2="6.25"
                  stroke="#A6A6A6"
                  stroke-width="1.5"
                />
                <line
                  y1="11.25"
                  x2="17"
                  y2="11.25"
                  stroke="#A6A6A6"
                  stroke-width="1.5"
                />
              </svg>
            </div>
          </div>
          {noCredits ? (
            <div className="CreditBox">
              <div className="credit-container">
                <div className="creditTitle">
                  <span className="creditTime">You ran out of credits</span>
                  <div onClick={handleCredits}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M11 1L1 11M1 1L11 11"
                        stroke="black"
                        stroke-width="1.67"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="creditMon">
                  Wait until next Jan 1, or you can choose to upgrade straight
                  away
                </div>
                <div class="container">
                  <div class="upgradeTitle">
                    <span className="upgradeTime">Why upgrade?</span>
                  </div>
                  <div className="benefitBox">
                    <div class="benefit">
                      <span class="benefit-icon">😎</span>
                      <span>Unlimited summary</span>
                    </div>
                    <div class="benefit">
                      <span class="benefit-icon">🥳</span>
                      <span>Unlimited transcripts</span>
                    </div>
                    <div class="benefit">
                      <span class="benefit-icon">🕰️</span>
                      <span>No limits on video length</span>
                    </div>
                    <div class="benefit">
                      <span class="benefit-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_14_168)">
                            <path
                              d="M13.999 10.4611C13.999 10.5377 13.9966 10.704 13.992 10.8324C13.9808 11.1466 13.9559 11.5521 13.9182 11.7368C13.8616 12.0144 13.7761 12.2765 13.6647 12.4946C13.5328 12.7526 13.3647 12.9837 13.1649 13.1831C12.9655 13.3822 12.7346 13.5497 12.477 13.681C12.2577 13.7927 11.994 13.8782 11.7148 13.9346C11.5319 13.9715 11.1295 13.996 10.8173 14.0071C10.6888 14.0117 10.5225 14.014 10.4461 14.014L3.55239 14.0129C3.47574 14.0129 3.30951 14.0105 3.18109 14.0059C2.86687 13.9946 2.46142 13.9697 2.27667 13.9321C1.99905 13.8755 1.737 13.79 1.51891 13.6786C1.26089 13.5467 1.0298 13.3786 0.830338 13.1787C0.631275 12.9793 0.463768 12.7485 0.332477 12.4908C0.220723 12.2716 0.135219 12.0079 0.0788496 11.7287C0.0419355 11.5458 0.0175039 11.1434 0.00638867 10.8312C0.00182227 10.7026 -0.000488281 10.5364 -0.000488281 10.46L0.000605469 3.56627C0.000605469 3.48961 0.00294336 3.32338 0.00755078 3.19496C0.0188301 2.88074 0.0437266 2.47528 0.0813926 2.29055C0.138008 2.01293 0.223457 1.75088 0.334896 1.53277C0.466734 1.27477 0.634912 1.04366 0.834727 0.8442C1.03412 0.645152 1.26501 0.47763 1.52263 0.346325C1.74188 0.234599 2.00557 0.149095 2.28477 0.0927259C2.46765 0.0557982 2.87009 0.0313665 3.1823 0.020265C3.31084 0.0156849 3.47713 0.0133743 3.55347 0.0133743L10.4472 0.0144818C10.5239 0.0144818 10.6901 0.0168196 10.8185 0.0214271C11.1327 0.0327064 11.5382 0.0576028 11.7229 0.0952689C12.0005 0.151884 12.2626 0.237333 12.4807 0.348773C12.7387 0.480611 12.9698 0.648788 13.1693 0.848603C13.3683 1.04799 13.5358 1.27887 13.6671 1.5365C13.7789 1.75576 13.8644 2.01943 13.9207 2.29863C13.9577 2.48153 13.9821 2.88395 13.9932 3.19617C13.9978 3.32472 14.0001 3.49099 14.0001 3.56736L13.999 10.4611Z"
                              fill="url(#paint0_linear_14_168)"
                            />
                            <path
                              d="M10.7093 3.32563C9.7614 2.37698 8.50086 1.85428 7.15781 1.85374C4.3906 1.85374 2.13842 4.10507 2.13731 6.87231C2.13696 7.75686 2.36813 8.62031 2.80746 9.3814L2.09521 11.9822L4.75665 11.2843C5.48996 11.6841 6.31555 11.8948 7.15582 11.8952H7.15788C9.92482 11.8952 12.1772 9.64357 12.1783 6.8763C12.1789 5.53527 11.6571 4.27428 10.7093 3.32563ZM7.15788 11.0475H7.15617C6.40741 11.0472 5.67301 10.8461 5.03233 10.4661L4.87994 10.3757L3.30061 10.7898L3.72217 9.25049L3.62292 9.09266C3.20522 8.42849 2.98461 7.66082 2.98494 6.87264C2.98584 4.57263 4.85778 2.7014 7.1595 2.7014C8.27404 2.70182 9.32176 3.13632 10.1096 3.92479C10.8974 4.71326 11.3311 5.76136 11.3307 6.87599C11.3298 9.17618 9.45783 11.0475 7.15788 11.0475ZM9.44676 7.92329C9.32129 7.86052 8.70457 7.55713 8.58957 7.51528C8.47459 7.47342 8.39098 7.4525 8.30732 7.57806C8.22372 7.7036 7.98331 7.98607 7.91011 8.06976C7.83694 8.15346 7.76377 8.16393 7.63833 8.10115C7.51287 8.03838 7.10868 7.90596 6.62953 7.47872C6.25663 7.14624 6.00485 6.73553 5.93168 6.60997C5.85851 6.48442 5.9239 6.41657 5.9867 6.35403C6.04312 6.29786 6.11213 6.20757 6.17486 6.13434C6.23757 6.06113 6.25849 6.00879 6.3003 5.92511C6.34212 5.84141 6.32121 5.76817 6.28984 5.7054C6.25849 5.64263 6.0076 5.02537 5.90306 4.77429C5.80125 4.52975 5.69781 4.56284 5.62081 4.559C5.54772 4.55536 5.46401 4.5546 5.38039 4.5546C5.29677 4.5546 5.16086 4.58597 5.04588 4.71152C4.9309 4.83707 4.60683 5.14046 4.60683 5.75771C4.60683 6.37495 5.05632 6.97128 5.11905 7.05496C5.18178 7.13866 6.00361 8.40535 7.26199 8.94855C7.5613 9.07774 7.79495 9.15491 7.97714 9.21271C8.27765 9.30813 8.55112 9.29468 8.76728 9.2624C9.00829 9.2264 9.50945 8.95903 9.61401 8.6661C9.71854 8.37315 9.71854 8.12208 9.68718 8.06977C9.65582 8.01746 9.5722 7.98607 9.44676 7.92329Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <linearGradient
                              id="paint0_linear_14_168"
                              x1="6.9998"
                              y1="0.0133743"
                              x2="6.9998"
                              y2="14.014"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#61FD7D" />
                              <stop offset="1" stop-color="#2BB826" />
                            </linearGradient>
                            <clipPath id="clip0_14_168">
                              <rect width="14" height="14" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <span>Get summary via whatsapp</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="subsBox">
                <div className="subsBox_container">
                  <div
                    className={`subsDur ${
                      subscriptionType === "Annual" ? "active" : ""
                    }`}
                    onClick={() => setSubscriptionType("Annual")}
                  >
                    <div className="subsDurInner">
                      <div className="savings">
                        <span className="Annual">Annual</span>
                        <text className="save">Save 35% 🥳</text>
                      </div>
                      <div className="priceTab">
                        <span className="Price">$ 8.99 </span>
                        <span className="month">/month</span>
                      </div>
                      {subscriptionType === "Annual" && (
                        <div className="icon-container">
                          {" "}
                          <div className="icon-container">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="none"
                            >
                              <circle
                                cx="6.5"
                                cy="6.5"
                                r="6.5"
                                fill="url(#paint0_linear_14_191)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_14_191"
                                  x1="6.5"
                                  y1="0"
                                  x2="6.5"
                                  y2="13"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#885DF1" />
                                  <stop offset="1" stop-color="#6610F2" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <svg
                              className="tick-icon"
                              xmlns="http://www.w3.org/2000/svg"
                              width="8"
                              height="6"
                              viewBox="0 0 8 6"
                              fill="none"
                            >
                              <path
                                d="M6.6 1L2.75 4.85L1 3.1"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`subsDur ${
                      subscriptionType === "Monthly" ? "active" : ""
                    }`}
                    onClick={() => setSubscriptionType("Monthly")}
                  >
                    <div className="subsDurInner2">
                      <div className="savings">
                        <span className="Annual">Monthly</span>
                      </div>
                      <div className="priceTab">
                        <span className="Price">$ 14.99 </span>
                        <span className="month">/month</span>
                      </div>
                      {subscriptionType === "Monthly" && (
                        <div className="icon-container">
                          {" "}
                          <div className="icon-container">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="none"
                            >
                              <circle
                                cx="6.5"
                                cy="6.5"
                                r="6.5"
                                fill="url(#paint0_linear_14_191)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_14_191"
                                  x1="6.5"
                                  y1="0"
                                  x2="6.5"
                                  y2="13"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#885DF1" />
                                  <stop offset="1" stop-color="#6610F2" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <svg
                              className="tick-icon"
                              xmlns="http://www.w3.org/2000/svg"
                              width="8"
                              height="6"
                              viewBox="0 0 8 6"
                              fill="none"
                            >
                              <path
                                d="M6.6 1L2.75 4.85L1 3.1"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="transBox">
          <span className="transTitle">Video Transcript</span>
            </div>
        </div>
        <div onClick={handleClick}>
          {loading ? (
            <div className="loadingSpinner">
              <p className="summarizeText">{buttonText}</p>
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          ) : (
            <div className="summarizeBtn">
              {noCredits ? null : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.9281 5.93447L6.51034 7.35158L6.8584 7.69998L8.27617 6.28287L7.9281 5.93447ZM5.27167 4.37487C5.57464 4.07157 6.06487 4.07157 6.36784 4.37487L7.54572 5.55241L6.12795 6.96985L4.95008 5.79198C4.64678 5.48868 4.64678 4.99812 4.95008 4.69581L5.27167 4.37487ZM15.7725 13.7789C16.0758 14.0815 16.0758 14.5731 15.7725 14.8751L15.4522 15.1954C15.1493 15.4986 14.6584 15.4986 14.3561 15.1954L7.2787 8.11798L8.69614 6.69989L15.7725 13.7789ZM2.042 4.24708L2.30444 4.93766L2.99469 5.19977L2.30444 5.46254L2.042 6.15279L1.77956 5.46254L1.0893 5.19977L1.77956 4.93766L2.042 4.24708ZM4.24806 1.25337L4.72359 0L5.19846 1.25337L6.45216 1.7289L5.19846 2.20443L4.72359 3.45812L4.24806 2.20443L2.99469 1.7289L4.24806 1.25337ZM0.740911 1.95212L1.021 1.21121L1.30109 1.95212L2.04167 2.23221L1.30109 2.51328L1.021 3.25353L0.740911 2.51328L0 2.23221L0.740911 1.95212Z"
                    fill="white"
                  />
                </svg>
              )}
              <p className="summarizeText">{buttonText}</p>
            </div>
          )}
          {noCredits ? (
            <span className="refundTxt">
              *No questions on refund if you’re not satisfied
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
