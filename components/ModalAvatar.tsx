import React, { FC, useState, useEffect } from "react";
import { Avatar, Box, Button, Modal, Text } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import avaBasic from "../app/data/avaBasic.json";
import avaPremium from "../app/data/avaPremium.json";
import { FontAwesome } from "@expo/vector-icons";
import { IAvatar } from "@/app/interface/interface";

interface ModalAvatarProps {
  open: boolean;
  onClose: () => void;
}

const ModalAvatar: FC<ModalAvatarProps> = ({ open, onClose }) => {
  const [diamond, setDiamond] = useState<number>(999);
  const [selectedAva, setSelectedAva] = useState<IAvatar>();
  const [selectedAvaBasic, setSelectedAvaBasic] = useState<IAvatar>();
  const [selectedAvaPremium, setSelectedAvaPremium] = useState<IAvatar>();
  const [buyAvatar, setBuyAvatar] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleSelectAvaBasic = (dataAva: IAvatar) => {
    setSelectedAvaBasic(dataAva);
    setSelectedAvaPremium(undefined);
    setSelectedAva(dataAva);
  };

  const handleBuyAvaPremium = (dataAva: IAvatar) => {
    if (diamond < dataAva.price) {
      setShowAlert(true);
      setSelectedAvaPremium(undefined);
      return;
    }
    setSelectedAvaPremium(dataAva);
    setSelectedAvaBasic(undefined);
    setBuyAvatar(true);
  };

  const handleConfirm = () => {
    setSelectedAva(selectedAvaPremium);
    setDiamond((prevDiamond) => prevDiamond - (selectedAvaPremium?.price || 0));
    setBuyAvatar(false);
  };

  useEffect(() => {
    if (open) {
      setSelectedAvaBasic(undefined);
      setSelectedAvaPremium(undefined);
      setSelectedAva(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (selectedAvaBasic) {
      setSelectedAvaPremium(undefined);
    } else if (selectedAvaPremium) {
      setSelectedAvaBasic(undefined);
    }
  }, [selectedAvaBasic, selectedAvaPremium]);

  return (
    <>
      <Modal isOpen={open} onClose={onClose} size={"xl"}>
        <Modal.Content>
          <Modal.Body style={{ backgroundColor: "#A5A4D7" }}>
            {/* Box ava basic */}
            <Text textAlign={"center"} fontSize={24} fontWeight={800} color={"black"}>
              Basic
            </Text>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {avaBasic.map((item) => (
                <LinearGradient
                  key={item.id}
                  colors={["#75A5E1", "#C2CFE0"]}
                  style={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: item.id === selectedAvaBasic?.id ? 3 : 2,
                    borderColor: item.id === selectedAvaBasic?.id ? "lime" : "black",
                    borderRadius: 4,
                    margin: 4,
                    padding: 4,
                  }}
                  onTouchEnd={() => handleSelectAvaBasic(item)}
                >
                  <Avatar
                    source={{ uri: item.ava }}
                    size="lg"
                    borderWidth={2}
                    borderColor={"black"}
                  />
                  <Text color={"amber.500"} fontSize={16}>
                    {item.isPremium ? "bayar" : "free"}
                  </Text>
                </LinearGradient>
              ))}
            </Box>

            {/* Box ava premium */}
            <Text textAlign={"center"} fontSize={24} fontWeight={800} color={"black"}>
              Premium
            </Text>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {avaPremium.map((item) => (
                <LinearGradient
                  key={item.id}
                  colors={["#75A5E1", "#C2CFE0"]}
                  style={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: item.id === selectedAvaPremium?.id ? 3 : 2,
                    borderColor: item.id === selectedAvaPremium?.id ? "lime" : "black",
                    borderRadius: 4,
                    margin: 4,
                    padding: 4,
                  }}
                  onTouchEnd={() => handleBuyAvaPremium(item)}
                >
                  <Avatar
                    source={{ uri: item.ava }}
                    size="lg"
                    borderWidth={2}
                    borderColor={"black"}
                  />
                  <Text color={"blue.500"} fontSize={16}>
                    <FontAwesome name="diamond" size={16} />
                    {item.price}
                  </Text>
                </LinearGradient>
              ))}
            </Box>

            {/* Alert */}
            <Box
              style={{
                display: showAlert ? "flex" : "none",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginTop: 8,
                marginBottom: 8,
              }}
            >
              <FontAwesome name="warning" size={26} color={"red"} />
              <Text color={"red.500"} fontSize={16} fontWeight={600}>
                You don't have enough diamonds
              </Text>
            </Box>

            {/* Buttons */}
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 8,
                marginTop: 12,
              }}
            >
              <Button width={"50%"} backgroundColor={"red.500"} onPress={onClose}>
                Cancel
              </Button>
              <Button
                width={"50%"}
                backgroundColor={"green.500"}
                onPress={() => {
                  setSelectedAva(undefined);
                  setSelectedAvaBasic(undefined);
                  setSelectedAvaPremium(undefined);
                  onClose();
                  console.log("Avatar changed!");
                }}
              >
                Save
              </Button>
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal isOpen={buyAvatar} onClose={() => setBuyAvatar(false)} size={"lg"}>
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
                colors={["#75A5E1", "#C2CFE0"]}
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 3,
                  borderColor: "black",
                  borderRadius: 4,
                  margin: 4,
                  padding: 4,
                }}
              >
                <Avatar
                  source={{ uri: selectedAvaPremium?.ava }}
                  size="lg"
                  borderWidth={2}
                  borderColor={"black"}
                />
                <Text color={"blue.500"} fontSize={16}>
                  <FontAwesome name="diamond" size={16} />
                  {selectedAvaPremium?.price}
                </Text>
              </LinearGradient>
              <Text>Are you sure to buy this avatar?</Text>
            </Box>

            {/* Buttons */}
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
                  setBuyAvatar(false);
                  setSelectedAvaPremium(undefined);
                }}
              >
                Cancel
              </Button>
              <Button width={"50%"} backgroundColor={"green.500"} onPress={handleConfirm}>
                Confirm
              </Button>
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ModalAvatar;
