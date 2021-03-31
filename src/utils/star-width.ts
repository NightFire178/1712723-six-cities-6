export default (rating:number): string=>{
  const intRating = Math.floor(rating);
  return `${(rating - intRating) * 10 >= 5 ? intRating * 20 + 20 : intRating * 20}%`;
}
