/** @format */

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGetData from "../hooks/useGetData";
import { setProfile, setProfileError } from "../store/auth/slice";
import { useAppDispatch } from "../store/store";
import { truncateAddress } from "../utils/common";

export const ConnectWallet = () => {
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const [position, setPosition] = React.useState("bottom");

  const { connectors, connect, status } = useConnect();
  const { data: userInfo, error, isError, isSuccess } = useGetData(`/user/${account.address}`);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setProfile(userInfo));
    } else if (isError) {
      console.log("⚡ ~ error:", error);
      dispatch(setProfileError(error));
    }
  });
  return (
    <div>
      {account.status === "connected" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{truncateAddress(account.address)}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />

            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              {isError ? (
                <DropdownMenuGroup>
                  <DropdownMenuItem value="Register">
                    <Link to={"/register"}>Register</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              ) : (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem value="Profile">
                      <Link to={"/profile"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={disconnect} className="cursor-pointer">
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          {connectors.map((connector) =>
            connector.id === "metaMaskSDK" ? (
              <button
                className="h-10 px-6 font-semibold rounded-md bg-black text-white font-mono"
                key={connector.uid}
                onClick={() => connect({ connector })}
                type="button"
              >
                {connector.name}
              </button>
            ) : null
          )}
        </>
      )}
    </div>
  );
};
