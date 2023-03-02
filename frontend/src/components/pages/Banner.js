import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";

export default function App() {
  return (
    <div style={{ display: "block", width: "100%", padding: 10 }}>
      <Carousel style={{}}>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1676461327/Croma%20Assets/CMS/LP%20Page%20Banners/2023/TGIF/HP%20Rotating%20Banners/HP_TGIF_15Feb2023_cmrim6.png/mxw_2048,f_auto"
            alt="Image One"
          />
          <Carousel.Caption>
            <h3>Label for first slide</h3>
            <p>Sample Text for Image One</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100 rounded-full border-green-900"
            src="https://us-cdn.maimo.co//images/p9@2x-e89b591673345526904.webp"
            alt="Image Two"
          />

          <Carousel.Caption>
            <p className="text-black">Label for second slide</p>
            <p>Sample Text for Image Two</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100 rounded-full"
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1671425814/Croma%20Assets/CMS/CAtegory/AC%20PCP%20-%20C46/UPDATED%20BANNERS/desktop/Main%20Banner/PCP_AC_NC_13dec2022_cttchq.png/mxw_2048,f_auto"
            alt="Image Two"
          />

          <Carousel.Caption>
            <h3 className="">Label for second slide</h3>
            <p>Sample Text for Image Two</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1671002757/Croma%20Assets/CMS/CAtegory/Laptop%20PCP%2020/1412/Desk/Main/PCP_LP_NC_13dec2022_ejtujy.png/mxw_2048,f_auto"
            alt="Image One"
          />
          <Carousel.Caption>
            <h3>Label for first slide</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Nesciunt, repudiandae?
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://us-cdn.maimo.co//images/img_p3_1@2x-fade341673345526904.webp"
            alt="Image One"
          />
          <Carousel.Caption>
            <h3>Label for first slide</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Nesciunt, repudiandae?
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
