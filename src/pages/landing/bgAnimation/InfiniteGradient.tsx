const InfiniteGradient = ({ colors }: { colors: string[] }) => {
  const palindrome = [...colors, ...[...colors].reverse().slice(1)];
  const gradient = `linear-gradient(to right, ${palindrome.join(", ")})`;

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: gradient,
          backgroundSize: "300% 100%",
          backgroundPosition: "0% 0%",
          animation: `bg-scroll 60s linear infinite`,
        }}
      />
    </>
  );
};

export default InfiniteGradient;
