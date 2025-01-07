export default function ImageCard({ images }) {
  const width = 200;
  const height = 150;
  return (
    <>
      <img
        src={images.url}
        alt={images.fileName}
        width={width}
        height={height}
      />
    </>
  );
}
