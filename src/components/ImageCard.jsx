function ImageCard({ className, title, subtitle, imgUrl }) {
  return (
    <div
      className={`rounded-lg border bg-card p-3 text-card-foreground shadow-sm hover:cursor-pointer hover:bg-accent ${className}`}
    >
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-md bg-muted">
        <img
          src={
            imgUrl ||
            `https://picsum.photos/id/${
              Math.floor(Math.random() * 1000) + 1
            }/1600/900.webp`
          }
          alt="Classroom name thumbnail"
          className="h-full rounded-md object-cover text-sm text-muted-foreground"
        />
      </div>

      <div className="mt-3 flex flex-col gap-1 text-card-foreground">
        <span>{title}</span>
        <span className="text-sm capitalize text-muted-foreground">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

export default ImageCard;
