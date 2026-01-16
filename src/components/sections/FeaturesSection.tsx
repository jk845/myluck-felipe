import React from "react";
import LazyImage from "../ui/lazy-image";
import feature1 from "../../assets/features_1.jpg";
import feature3 from "../../assets/features_3.jpg";
import feature4 from "../../assets/features_4.jpg";
import feature5 from "../../assets/features_5.jpg";

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-12 bg-white w-full">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-semibold font-['Hind_Vadodara'] mb-5">
          Myluck fokuserer på
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Flattening stomach - Image 1 */}
          <div className="rounded-[30px] overflow-hidden aspect-square relative">
            <LazyImage
              className="w-full h-full object-cover"
              src={feature1}
              alt="Get a flatter stomach"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white text-xl font-semibold font-['Hind_Vadodara'] leading-tight">
                Få flatere <br /> mage
              </div>
            </div>
          </div>

          {/* Losing weight mindfully - Keep original butterfly design */}
          <div className="bg-fuchsia-100 rounded-[30px] p-4 flex flex-col items-center justify-center aspect-square relative">
            <div className="mb-2">
              <svg
                width="31"
                height="36"
                viewBox="0 0 31 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.45009 3.25314C8.6755 3.39832 10.1745 6.84599 11.546 9.33312C13.4468 13.1567 15.3351 17.144 15.5947 21.4945C16.4126 23.466 18.0515 21.7619 17.2076 20.3067C17.5548 17.7834 18.141 15.1711 19.4853 12.9455C20.9866 10.3181 22.4813 7.34997 25.1995 5.86786C27.7061 6.13231 27.8258 9.78822 28.1055 11.8129C28.4767 14.5054 27.6314 17.5023 26.6386 19.9034C24.2561 23.6385 19.2578 31.5971 15.3423 32.4706C11.8003 29.6359 5.7791 19.5417 4.58424 16.2754C3.75621 12.3418 2.81134 8.04361 4.25236 4.15404C4.51288 3.70824 4.82944 3.15196 5.45009 3.25314ZM6.15408 0.00687084C2.54507 -0.182304 0.387137 3.57088 0.129967 6.82155C-0.715296 13.4265 2.70933 19.4635 6.14354 24.7555C8.7526 28.712 11.9828 32.211 15.2456 35.5917C16.4251 36.5923 17.4351 35.6206 16.587 34.1174C18.5327 32.9643 19.8296 31.3908 21.5838 29.9135C25.1924 27.0598 27.5897 22.92 29.6251 18.8261C31.2385 14.6178 31.7505 9.47537 29.3933 5.45236C28.1333 3.47702 25.4323 2.86893 23.4923 4.16138C20.4019 6.2027 18.346 9.62446 17.0841 13.0902C16.7249 14.1798 16.4136 16.1732 16.1785 14.0068C15.3782 10.1524 13.5052 6.57518 11.3099 3.36997C9.99009 1.78081 8.31393 0.127121 6.15408 0.00687084Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="text-center text-black text-xl font-semibold font-['Hind_Vadodara'] leading-[1] tracking-tighter">
              Å gå ned i vekt <br /> på en bevisst og <br /> sunn måte
            </div>
          </div>

          {/* Shaping up glutes - Image 3 */}
          <div className="rounded-[30px] overflow-hidden aspect-square relative">
            <LazyImage
              className="w-full h-full object-cover"
              src={feature3}
              alt="Shape your glutes"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center  tracking-tighter text-white text-xl font-semibold font-['Hind_Vadodara'] leading-tight">
                Å forme <br /> rumpa
              </div>
            </div>
          </div>

          {/* Delicious & healthy food - Image 4 */}
          <div className="rounded-[30px] overflow-hidden aspect-square relative">
            <LazyImage
              className="w-full h-full object-cover"
              src={feature4}
              alt="Delicious and healthy food"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center  tracking-tighter text-white text-xl font-semibold font-['Hind_Vadodara'] leading-tight">
                Deilig og <br />sunn mat
              </div>
            </div>
          </div>

          {/* Feeling feminine & loving yourself - Image 5 */}
          <div className="rounded-[30px] overflow-hidden aspect-square relative">
            <LazyImage
              className="w-full h-full object-cover"
              src={feature5}
              alt="Feel feminine and love yourself"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center  tracking-tighter text-white text-xl font-semibold font-['Hind_Vadodara'] leading-tight">
                Å føle seg<br /> feminin og<br /> elske seg <br /> selv.
              </div>
            </div>
          </div>

          {/* Supportive group in Facebook */}
          <div className="rounded-[30px] overflow-hidden aspect-square relative bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50">
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-4">
              {/* Official Facebook icon from Font Awesome */}
              <div className="mb-3">
                <svg
                  className="w-14 h-14"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#1877f2"
                >
                  <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376.6 82.7 477.2 194.2 504.5V326.7H135.9V256h58.3v-53.6c0-57.6 34.3-89.4 86.8-89.4 25.1 0 51.4 4.5 51.4 4.5v56.5h-29c-28.5 0-37.4 17.7-37.4 35.8V256h63.8l-10.2 70.7H266v177.8C377.3 477.2 512 376.6 512 256z"/>
                </svg>
              </div>
              <div className="text-center tracking-tighter text-gray-900 text-xl font-semibold font-['Hind_Vadodara'] leading-tight">
                Støttende<br /> gruppe på <br /> Facebook
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;