import React, { useCallback } from "react";
import LiveCursors from "./cursors/LiveCursors";
import { useMyPresence, useOthers } from "@/liveblocks.config";

function Live() {
  const others = useOthers();

  const [{ cursor }, upddateMyPresence] = useMyPresence() as any;

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().x;

    upddateMyPresence({ cursor: { x, y } });
  }, []);
  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    upddateMyPresence({ cursor: null, message: null });
  }, []);
  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().x;

    upddateMyPresence({ cursor: { x, y } });
  }, []);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="h-[100vh] flex justify-center items-center w-full text-center"
    >
      <h1 className="text-2xl text-white">Hello</h1>

      <LiveCursors others={others} />
    </div>
  );
}

export default Live;
