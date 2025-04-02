import React from "react";

const Owner = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Aticha Predikanit (Blue)</h1>
      <h2 className="text-2xl font-bold mb-4">JSD#9</h2>
      <img
        src="profile.jpg"
        alt="aticha-blue"
        className="w-auto h-[221px] object-cover"
      ></img>
      <h3 className="text-xl font-bold my-4">Short Biography:</h3>
      <p className="text-gray-700 text-center mb-4 max-w-xl">
        I am a dedicated software developer with a strong emphasis on crafting
        intuitive and user-focused applications. Coding excites me, and I thrive
        on tackling challenging problems to create innovative solutions.
      </p>
    </div>
  );
};

export default Owner;
