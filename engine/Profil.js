import { bscChain, polyChain, ethChain } from './chainchange';
import Link from 'next/link';

import 'sf-font';
import { Col, Dropdown } from '@nextui-org/react';
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from "next/router";



export default function ConnectChain(props) {
  const [selected, setSelected] = React.useState(new Set(["Set Network"]));
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const router = useRouter();

  async function enableChain() {
    var bsc = "Binance Smart Chain";
    var poly = "Polygon";
    var eth = "Ethereum";

    if (bsc == selectedValue) {
      bscChain();
    } else if (poly == selectedValue) {
      polyChain();
    } else if (eth == selectedValue) {
      ethChain();
    }
  }
  const blockImage = React.useMemo(() => {
    var eth = "Ethereum";
    var bsc = "Binance Smart Chain";
    var pol = "Polygon";

    var init = "Set Network";
    if (selectedValue == eth) {
      return <img src="./ethereumlogo.png" width={"110px"} />;
    } else if (selectedValue == bsc) {
      return <img src="./bsc.png" width={"110px"} />;
    } else if (selectedValue == pol) {
      return <img src="./polygonwhite.png" width={"110px"} />;
    } else if (selectedValue == init) {
      return (
        <div className="mt">
          <h6>Profile</h6>
        </div>
      );
    }
  });
  useEffect(() => {
    enableChain();
  }, [selected]);

  return (
    <Col css={{ marginTop: "$2" }}>
      <li>
        <Link href={"/author/" + props.wallet}>
          <a
            className={
              router.pathname == "/author"
                ? "dropdown-item active"
                : "dropdown-item"
            }
          >
            <span className="me-1">
              <i className="icofont-user-alt-6"></i>
            </span>
            Profile
          </a>
        </Link>
      </li>
    </Col>
  );
}