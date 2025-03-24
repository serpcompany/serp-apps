export default defineEventHandler(async (event) => {
  const { id, chatId } = getRouterParams(event)
  const teamId = id as string

  // mock chat data
//   const chat = {
//     id: 'n234i09asfdnqasd',
//     title: 'Question about black holes',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     messages: [
//       {
//         id: '923j49unijdnasd',
//         role: 'user',
//         content: 'Are black holes real?',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: '28349unf098j82',
//         role: 'assistant',
//         content:
//           'Yes, black holes are real. They are regions in space where gravity is so strong that nothing, not even light, can escape.',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: 'nsadfp920j34jndf0asukjads',
//         role: 'user',
//         content: 'What is the radius of the event horizon of a black hole?',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: 'nsadfp920j34jndf0asukjads',
//         role: 'assistant',
//         content:
//           'The radius of the event horizon of a black hole is the distance from the center of the black hole to the point where the escape velocity is equal to the speed of light. This distance is called the Schwarzschild radius, and it is given by the formula: r = 2GM/c^2, where G is the gravitational constant, M is the mass of the black hole, and c is the speed of light.',
//       },
//       {
//         id: 'nsadfp920j34jndf0asukjads',
//         role: 'user',
//         content: 'Write an essay about black holes in 1000 words',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: 'nsadfp920j34jndf0asukjads',
//         role: 'assistant',
//         content: `## Black Holes: The Mysterious Giants of the Universe

// The universe is filled with wonders beyond our imagination, and among the most mysterious objects are black holes. These cosmic entities have fascinated scientists and space enthusiasts alike for centuries. A black hole is a region in space where gravity is so strong that nothing, not even light, can escape from it. This incredible force makes black holes one of the most extreme and intriguing phenomena in the cosmos. In this essay, we will explore what black holes are, how they form, their types, and their significance in understanding the universe.

// ## What is a Black Hole?

// A black hole is an area in space where the gravitational pull is so intense that nothing can escape its grasp. This happens because a massive amount of matter is packed into a very small space, creating an incredibly strong gravitational field. The boundary around a black hole, known as the **event horizon**, marks the point of no return. Anything that crosses this boundary is inevitably pulled into the black hole. Since light itself cannot escape, black holes are invisible. Scientists detect their presence by observing their effects on nearby stars and gas clouds.

// ## How Do Black Holes Form?

// Black holes are formed through the collapse of massive stars. When a star much larger than our Sun reaches the end of its life cycle, it undergoes a **supernova explosion**. During this explosion, the outer layers of the star are blown away, while the core collapses under its own gravity. If the core is massive enough, it continues collapsing until it becomes a black hole. This process results in an object with an incredibly strong gravitational pull that can trap everything around it.

// Not all stars become black holes. Smaller stars, like our Sun, will eventually turn into **white dwarfs** or **neutron stars** instead. Only the most massive stars, those at least three times the mass of the Sun, have the potential to form black holes.

// ## Types of Black Holes

// Scientists classify black holes into three main types based on their size and origin:

// ### 1. Stellar Black Holes
// These are the most common type and form when a massive star collapses. They typically have a mass between three and ten times that of the Sun. Despite their small size, they possess immense gravitational forces.

// ### 2. Supermassive Black Holes
// These black holes are millions to billions of times more massive than the Sun. They are found at the centers of galaxies, including our own Milky Way. Scientists are still trying to understand how these enormous black holes form, but they may grow by merging with other black holes and consuming vast amounts of gas and stars over billions of years.

// ### 3. Intermediate Black Holes
// These are less common and have a mass between stellar and supermassive black holes. Scientists believe they form when multiple smaller black holes merge over time.

// ## The Event Horizon and Singularity

// A key feature of a black hole is its **event horizon**. This is the boundary beyond which nothing can escape. Once an object crosses this invisible line, it is doomed to fall into the black hole. 

// At the center of a black hole lies the **singularity**, a point where gravity is infinitely strong, and the laws of physics as we know them break down. Time and space become distorted in ways that scientists are still trying to understand. The singularity remains one of the greatest mysteries in physics.

// ## Effects of Black Holes on Their Surroundings

// Although black holes themselves are invisible, their presence can be detected by their effects on nearby objects. Here are some ways black holes interact with their surroundings:

// ### 1. Gravitational Pull on Stars
// A black hole can pull in nearby stars and gas clouds. As material falls toward the black hole, it forms a swirling disk called an **accretion disk**. The intense heat generated by friction in the disk causes it to emit X-rays, which astronomers can detect.

// ### 2. Time Dilation
// According to Einstein’s **theory of relativity**, time slows down near a black hole. If an astronaut were to approach a black hole, they would experience time at a slower rate than someone far away. This concept, known as **time dilation**, has been confirmed through experiments and is often depicted in science fiction movies like *Interstellar*.

// ### 3. Spaghettification
// If an object, such as a spaceship, were to fall into a black hole, it would experience a process called **spaghettification**. Due to the extreme difference in gravitational pull between the top and bottom of the object, it would stretch into long, thin strands, like spaghetti.

// ## Black Holes and the Future of Space Exploration

// Black holes play a crucial role in shaping the universe. Scientists study them to understand gravity, space-time, and even the possibility of **wormholes**—hypothetical tunnels that could connect different parts of the universe. Some theories suggest that black holes might hold secrets about **parallel universes** or other dimensions.

// Recent discoveries, such as the **first-ever image of a black hole** captured by the Event Horizon Telescope in 2019, have provided new insights into these cosmic giants. Future space missions and advanced telescopes will continue to explore black holes, uncovering more about their nature and role in the cosmos.

// ## Conclusion

// Black holes are among the most fascinating and mysterious objects in the universe. Their immense gravity, ability to warp space-time, and impact on their surroundings make them a key subject of scientific research. While much has been discovered, many questions remain unanswered. As technology advances, scientists hope to unlock even more secrets of these cosmic giants. Understanding black holes not only helps us comprehend the vast universe but also deepens our knowledge of the fundamental laws of physics. With continued exploration, black holes may one day reveal hidden aspects of the universe that we have yet to imagine.
// `,
//       },
//     ],
//   }

  return []
})
