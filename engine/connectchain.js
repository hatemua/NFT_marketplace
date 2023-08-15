import { bscChain, polyChain, ethChain } from '../engine/chainchange';
import 'sf-font';
import { Col, Dropdown } from '@nextui-org/react';
import React from 'react';
import { useEffect } from 'react';

export default function ConnectChain() {
    const [selected, setSelected] = React.useState(new Set(["Set Network"]));
    const selectedValue = React.useMemo(
      () => Array.from(selected).join(", ").replaceAll("_", " "),
      [selected]
    );

    const blockImage = React.useMemo(() => {
        var eth = "Ethereum";
        var bsc = "Binance Smart Chain";
        var pol = "Polygon";
        
        var init = "Set Network";
        if (selectedValue == eth) {
            return(
              <img src='./ethereumlogo.png' width={"110px"}/>
            )
        }
        else if (selectedValue == bsc) {
          return(
            <img src='./bsc.png' width={"110px"}/>
          )
        }
        else if (selectedValue == pol) {
          return(
            <img src='./polygonwhite.png' width={"110px"}/>
          )
        }
        
        else if (selectedValue == init) {
            return(
                <div className='mt'>
                <h6>Select Network</h6>
                </div>
            )
          }
      })

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
      useEffect(() => {
        enableChain();
      }, [selected]);


    return (
        <Col css={{ marginTop: "$2" }}>
          <Dropdown>
            <Dropdown.Button
            aria-label='Connect Wallet'
              flat
              style={{
                background: "#fafafa",
                boxShadow: "0px 0px 4px #ffffff",
                fontFamily: "SF Pro Display",
                fontWeight: "500",
                color: "black",
                fontSize: "25px",
              }}
              css={{ tt: "small" }}
            >
            {blockImage}
            </Dropdown.Button>
            <Dropdown.Menu
                  css={{ 
                  backgroundColor:'#ffffff30'
                }}
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
              textValue={selected}
            > 
             
              <Dropdown.Item textValue="Polygon" key="Polygon">
                <img src="polygonwhite.png" width={"90px"} />
              </Dropdown.Item>
              <Dropdown.Item
                textValue="Binance Smart Chain"
                key="Binance Smart Chain"
              >
                <img src="bsc.png" width={"90px"} />
              </Dropdown.Item>
              
              
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      );
 }