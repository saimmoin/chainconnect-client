/** @format */

import { useStorageUpload } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

// import { useAppSelector } from "../store/store";
import { useAccount } from "wagmi";
import { publicClient, client } from "../utils/client";
import { wagmiAbi } from "../utils/abi";
import axios from "./../utils/axios";

const Register = ({ heading, buttonText, isUpdating = false }) => {
  const account = useAccount();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [isValidUsername, setValidUsername] = useState({
    isReserverd: false,
    isValid: true,
  });
  const { mutateAsync: upload } = useStorageUpload({});

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        //[username, displayname, bio, image]
        console.log("data found user", data);
        setUsername(data[0]);
        setDisplayName(data[1]);
        setBio(data[2]);
        setProfileImage(data[3]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const validateAndCheckAvailable = (functionName = "") => {
    return publicClient.readContract({
      address: "0x18614B51ca6097B1b4C5e2075C111f18Ce3Cb868",
      abi: wagmiAbi,
      functionName,
      args: [username],
    });
  };

  const getUserInfo = () => {
    return publicClient.readContract({
      address: "0x18614B51ca6097B1b4C5e2075C111f18Ce3Cb868",
      abi: wagmiAbi,
      functionName: "userInfo",
      args: [account.address],
    });
  };

  async function submitForm(imageURL = "") {
    const { request } = await publicClient.simulateContract({
      account: account.address,
      address: "0x18614B51ca6097B1b4C5e2075C111f18Ce3Cb868",
      abi: wagmiAbi,
      functionName: isUpdating ? "updateUserInfo" : "createAccount",
      args: [[username, displayName, bio, imageURL]],
    });
    await client.writeContract(request);
    console.log("Submitting form...");
  }

  const simpleURI = (hash) => "https://ipfs.io/ipfs/" + hash[0].split("/ipfs/")[1]; // ipfs://<hash>

  const uploadViathirdweb = async (payload) => {
    const result = await upload({
      data: payload,
      options: {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: true,
      },
    });
    return result;
  };

  const handleImageUpload = async (e) => {
    // And upload the data with the upload function
    const imageHash = await uploadViathirdweb([e.target.files[0]]);
    console.log("⚡ ~ imageHash:", imageHash);

    //URI Metadata object
    // const metadataHash = await uploadViathirdweb([
    //   {
    //     // ...nftState,
    //     image: 'https://ipfs.io/ipfs/' + imageHash[0].split('/ipfs/')[1], // public IPFS gateway,
    //   },
    // ])
    console.log("https://ipfs.io/ipfs/" + imageHash[0].split("/ipfs/")[1]);

    // console.log("⚡ ~ metadataHash:", metadataHash);
    return "https://ipfs.io/ipfs/" + imageHash[0].split("/ipfs/")[1];

    // setProfileImage(response);
    // console.log("⚡ ~ file:", file)
    // setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const form = e.target; // the form element
      const formData = {
        username: form.username.value,
        displayName: form.displayName.value,
        bio: form.bio.value,
        profileImage: form.profileImage.files[0],
        walletAddress: form.walletAddress.value,
      };
      console.log(formData);

      let imageURL = await uploadViathirdweb([formData.profileImage]);
      imageURL = simpleURI(imageURL);
      submitForm(imageURL);
      const backendResponse = !isUpdating
        ? await axios.post("/user", {
            userAddress: account.address,
            followerAddress: [],
          })
        : null;
      console.log(backendResponse);
    } catch (error) {
      console.log(error);
    }
    //make smart contract create account transaction
  };

  const handleUsernameCheck = async (username) => {
    try {
      // e.preventDefault();
      // Handle form submission, validations, etc.
      console.log({
        username,
        displayName,
        profileImage,
        bio,
        address: account.address,
      });
      const [isNameReserved, validateName] = await Promise.all([
        validateAndCheckAvailable("isNameReserved"),
        validateAndCheckAvailable("validateName"),
      ]);
      setValidUsername({
        isReserverd: isNameReserved,
        isValid: validateName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("isValidUsername", isValidUsername);
  }, [isValidUsername]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-mono pt-14 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{heading}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setTimeout(() => {
                  handleUsernameCheck(e.target.value);
                }, 1500);
              }}
              required
            />
            {isValidUsername.isReserverd && <p className="text-red-500 text-xs mt-1">Username is reserved</p>}
            {!isValidUsername.isValid && <p className="text-red-500 text-xs mt-1">Username is not valid</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              placeholder="Enter your display name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileImage">
              Profile Image
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              // onChange={handleImageUpload}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              placeholder="Tell us about yourself"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="walletAddress">
              Wallet Address
            </label>
            <input
              id="walletAddress"
              type="text"
              placeholder="Enter your wallet address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={account.address}
              // onChange={(e) => setWalletAddress(e.target.value)}
              disabled
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200 font-bold"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
