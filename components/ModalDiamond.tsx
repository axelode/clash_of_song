import { Box, Button, Image, Modal, Text } from "native-base";
import React, { FC, useEffect, useState } from "react";
import diamonds from "../app/data/diamond.json";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { WebView } from "react-native-webview";
import { IDiamond } from "@/app/interface/interface";
import useStore from "@/app/z-context";

interface ModalDiamondProps {
  open: boolean;
  onClose: () => void;
  onPurchase: (amount: number) => void;
}

const ModalDiamond: FC<ModalDiamondProps> = ({ open, onClose, onPurchase }) => {
  const user = useStore((state) => state.user);

  const [transactionToken, setTransactionToken] = useState<string | null>(null);
  const [buyDiamond, setBuyDiamond] = useState<boolean>(false);
  const [selectedDiamond, setSelectedDiamond] = useState<IDiamond | undefined>(
    undefined
  );
  const [openMidtrans, setOpenMidtrans] = useState<boolean>(false);

  const handleClose = () => {
    setTransactionToken(null);
    setBuyDiamond(false);
    setSelectedDiamond(undefined);
    setOpenMidtrans(false);
  };

  const handlePurchase = () => {
    fetchSnapToken();
    setOpenMidtrans(true);
    onPurchase(selectedDiamond?.value || 0);
  };

  const fetchSnapToken = async () => {
    if (!selectedDiamond) return;
    try {
      const response = await axios.post(
        "https://4ed9-2404-8000-1005-37ac-518-12ed-414c-efd1.ngrok-free.app/midtrans/create",
        {
          qty: 1,
          price: selectedDiamond.price,
          userId: user.id,
        }
      );
      setTransactionToken(response.data.token);
    } catch (error) {
      console.error("Error fetching snap token:", error);
    }
  };

  useEffect(() => {
    if (open) {
      setSelectedDiamond(undefined);
    }
  }, [open]);

  return (
    <>
      <Modal
        isOpen={open}
        onClose={onClose}
        size={"xl"}
      >
        <Modal.Content>
          <Modal.Body style={{ backgroundColor: "#A5A4D7" }}>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {diamonds.map((item) => (
                <LinearGradient
                  key={item.id}
                  colors={["#75A5E1", "#C2CFE0"]}
                  style={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: item.id === selectedDiamond?.id ? 3 : 2,
                    borderColor:
                      item.id === selectedDiamond?.id ? "lime" : "black",
                    borderRadius: 4,
                    margin: 4,
                    padding: 4,
                  }}
                  onTouchEnd={() => {
                    setSelectedDiamond(item);
                  }}
                >
                  <Text>{item.value}</Text>

                  <Image
                    source={{ uri: item.attachment }}
                    alt={item.value.toString()}
                    size={"sm"}
                    resizeMode="contain"
                  />

                  <Text
                    color={"blue.500"}
                    fontSize={16}
                  >
                    Rp{item.price}
                  </Text>
                </LinearGradient>
              ))}
            </Box>

            {/* button */}
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 8,
                marginTop: 12,
              }}
            >
              <Button
                width={"50%"}
                backgroundColor={"red.500"}
                onPress={onClose}
              >
                Cancel
              </Button>

              <Button
                width={"50%"}
                backgroundColor={"green.500"}
                onPress={() => setBuyDiamond(true)}
              >
                Purchase
              </Button>
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={buyDiamond}
        onClose={handleClose}
        size={"xl"}
      >
        <Modal.Content>
          <Modal.Body style={{ backgroundColor: "#A5A4D7" }}>
            <Box
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LinearGradient
                key={selectedDiamond?.id}
                colors={["#75A5E1", "#C2CFE0"]}
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "black",
                  borderRadius: 4,
                  margin: 4,
                  padding: 4,
                }}
              >
                <Text>{selectedDiamond?.value}</Text>

                <Image
                  source={{ uri: selectedDiamond?.attachment }}
                  alt={selectedDiamond?.value.toString()}
                  size={"sm"}
                  resizeMode="contain"
                />

                <Text
                  color={"blue.500"}
                  fontSize={16}
                >
                  Rp{selectedDiamond?.price}
                </Text>
              </LinearGradient>
              <Text>Are you sure to buy this diamond?</Text>
            </Box>

            {/* button */}
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 8,
                marginTop: 12,
              }}
            >
              <Button
                width={"50%"}
                backgroundColor={"red.500"}
                onPress={() => {
                  setSelectedDiamond(undefined);
                  setBuyDiamond(false);
                }}
              >
                Cancel
              </Button>

              <Button
                width={"50%"}
                backgroundColor={"green.500"}
                onPress={handlePurchase}
              >
                Confirm
              </Button>
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={openMidtrans}
        onClose={handleClose}
        size={"xl"}
      >
        <Modal.Content>
          <Modal.Body>
            <WebView
              source={{
                uri: `https://app.sandbox.midtrans.com/snap/v4/redirection/${transactionToken}`,
              }}
              onNavigationStateChange={(navState) => {
                if (navState.url) {
                  const url = new URL(navState.url);
                  const status = url.searchParams.get("transaction_status");

                  if (status === "capture") {
                    handleClose();
                  }
                }
              }}
              style={{ width: "100%", minHeight: 600 }}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ModalDiamond;
