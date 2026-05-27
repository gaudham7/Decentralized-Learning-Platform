const NOTES_Maths = {
  primary: {
    sections: [
      {
        heading: "Numbers Around Us",
        content: "Numbers are everywhere in our daily life. We use numbers to count toys, books, fruits, and even steps while walking. Numbers help us know how many things we have. When we count, we start from 1 and go on like 2, 3, 4 and so on. These are called natural numbers.\n\nWe also use numbers to tell time, dates, and ages. For example, if you are 8 years old, that number tells your age. When we see house numbers or bus numbers, they help us find places.\n\nThere are small numbers like 1, 2, and 3, and big numbers like 100 or 1000. As we learn more, we understand how to read and write bigger numbers. Knowing numbers is the first step to learning maths.",
        simplified: "• Numbers help us count things.\n• We count 1, 2, 3, 4 and more.\n• Numbers tell age and time.\n• Big numbers mean many things.\n• Numbers are used every day."
      },
      {
        heading: "Addition and Subtraction",
        content: "Addition means putting things together. If you have 3 apples and get 2 more, you now have 5 apples. We write this as 3 + 2 = 5. The plus sign tells us to add.\n\nSubtraction means taking away. If you have 5 apples and eat 2, you have 3 left. We write this as 5 - 2 = 3. The minus sign tells us to take away.\n\nAddition and subtraction help us solve simple problems in daily life, like sharing candies or counting money.",
        simplified: "• Addition means joining.\n• 3 + 2 makes 5.\n• Subtraction means taking away.\n• 5 - 2 leaves 3.\n• We use them every day."
      },
      {
        heading: "Shapes and Patterns",
        content: "Shapes are forms of objects around us. A circle looks like a ball, a square has four equal sides, and a triangle has three sides. We see shapes in buildings, toys, and drawings.\n\nPatterns are designs that repeat. For example, red, blue, red, blue is a pattern. Patterns help us guess what comes next.\n\nLearning shapes and patterns helps us understand space and design.",
        simplified: "• Circle is round.\n• Square has 4 equal sides.\n• Triangle has 3 sides.\n• Patterns repeat again and again.\n• Shapes are everywhere."
      },
      {
        heading: "Measurement Basics",
        content: "Measurement helps us know how long, heavy, or tall something is. We use rulers to measure length. We use weighing scales to measure weight.\n\nWe measure time using clocks. Seconds, minutes, and hours tell us how long something takes.\n\nMeasurement helps us compare things and understand size.",
        simplified: "• Ruler measures length.\n• Scale measures weight.\n• Clock tells time.\n• Measure to compare things.\n• Helps us know size."
      }
    ],
    questionPool: [
      // Original 20
      { q: "What comes after 7?", options: ["6","8","9","5"], answer: 1, explanation: "When counting forward, 8 comes right after 7: ...6, 7, 8, 9..." },
      { q: "What is 3 + 4?", options: ["5","6","7","8"], answer: 2, explanation: "3 + 4 = 7. Count on from 3: 4, 5, 6, 7 — that's 4 steps, giving 7." },
      { q: "What is 5 - 2?", options: ["3","2","4","1"], answer: 0, explanation: "5 - 2 = 3. If you have 5 apples and remove 2, you are left with 3." },
      { q: "Which shape has 3 sides?", options: ["Square","Triangle","Circle","Rectangle"], answer: 1, explanation: "A triangle always has exactly 3 sides and 3 corners." },
      { q: "Which shape is perfectly round?", options: ["Circle","Square","Triangle","Rectangle"], answer: 0, explanation: "A circle is round with no corners or straight sides." },
      { q: "What do we use to measure length?", options: ["Clock","Scale","Ruler","Thermometer"], answer: 2, explanation: "A ruler has markings (cm, mm) that let us measure how long something is." },
      { q: "How many days are in one week?", options: ["5","6","7","8"], answer: 2, explanation: "A week has 7 days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday." },
      { q: "Which number is the largest?", options: ["2","9","1","3"], answer: 1, explanation: "9 is the largest single digit. Comparing 2, 9, 1, 3 — 9 is biggest." },
      { q: "What is 10 - 5?", options: ["5","4","6","3"], answer: 0, explanation: "10 - 5 = 5. Half of 10 is 5." },
      { q: "What is 2 + 2?", options: ["3","4","5","6"], answer: 1, explanation: "2 + 2 = 4. Two pairs of 2 make 4." },
      { q: "Which number is the smallest?", options: ["4","2","7","9"], answer: 1, explanation: "2 is smallest because it comes earliest when counting up from 1." },
      { q: "What instrument tells us the time?", options: ["Scale","Ruler","Clock","Thermometer"], answer: 2, explanation: "A clock shows hours and minutes so we know what time it is." },
      { q: "How many sides does a square have?", options: ["2","3","4","5"], answer: 2, explanation: "A square has 4 equal sides and 4 equal corners (right angles)." },
      { q: "What is 6 + 1?", options: ["6","7","8","5"], answer: 1, explanation: "6 + 1 = 7. Adding 1 to any number gives the next number." },
      { q: "What comes next: red, blue, red, ___?", options: ["Green","Blue","Yellow","Red"], answer: 1, explanation: "The pattern repeats: red, blue, red, blue. So blue comes next." },
      { q: "What is 9 - 3?", options: ["5","6","7","4"], answer: 1, explanation: "9 - 3 = 6. Count back 3 steps from 9: 8, 7, 6." },
      { q: "How many sides does a rectangle have?", options: ["3","4","5","6"], answer: 1, explanation: "A rectangle has 4 sides — 2 long sides and 2 short sides." },
      { q: "What is 1 more than 5?", options: ["4","6","7","3"], answer: 1, explanation: "1 more than 5 means 5 + 1 = 6." },
      { q: "Which is used to measure weight?", options: ["Ruler","Clock","Weighing scale","Thermometer"], answer: 2, explanation: "A weighing scale measures how heavy something is in grams or kilograms." },
      { q: "What is 8 - 4?", options: ["3","4","5","2"], answer: 1, explanation: "8 - 4 = 4. Half of 8 is 4." },
      // New 20
      { q: "What is 4 + 5?", options: ["8","9","10","7"], answer: 1, explanation: "4 + 5 = 9. Count on from 4: 5, 6, 7, 8, 9 — that's 5 steps." },
      { q: "What is 7 - 3?", options: ["3","4","5","2"], answer: 1, explanation: "7 - 3 = 4. Count back 3 from 7: 6, 5, 4." },
      { q: "How many corners does a triangle have?", options: ["2","3","4","5"], answer: 1, explanation: "A triangle has 3 sides and 3 corners (vertices)." },
      { q: "What comes before 10?", options: ["11","8","9","7"], answer: 2, explanation: "9 comes just before 10 when counting: ...8, 9, 10..." },
      { q: "What is 0 + 6?", options: ["0","5","6","7"], answer: 2, explanation: "Adding 0 to any number leaves it unchanged. 0 + 6 = 6." },
      { q: "How many hours are in one day?", options: ["12","20","24","30"], answer: 2, explanation: "There are 24 hours in one full day (midnight to midnight)." },
      { q: "Which number comes between 5 and 7?", options: ["4","6","8","9"], answer: 1, explanation: "Counting 5, 6, 7 — the number between 5 and 7 is 6." },
      { q: "What is 3 + 3?", options: ["5","6","7","8"], answer: 1, explanation: "3 + 3 = 6. Three groups of one added to three more makes six." },
      { q: "What shape has no corners?", options: ["Square","Triangle","Rectangle","Circle"], answer: 3, explanation: "A circle is perfectly round with no corners or straight edges." },
      { q: "What is 10 - 3?", options: ["6","7","8","9"], answer: 1, explanation: "10 - 3 = 7. Count back 3 from 10: 9, 8, 7." },
      { q: "How many minutes are in one hour?", options: ["30","45","60","100"], answer: 2, explanation: "There are 60 minutes in one hour. The minute hand goes all the way around once." },
      { q: "What is 5 + 5?", options: ["9","10","11","8"], answer: 1, explanation: "5 + 5 = 10. Five and five make ten — a full set of fingers!" },
      { q: "Which is longer: 10 cm or 5 cm?", options: ["5 cm","10 cm","They are equal","Can't tell"], answer: 1, explanation: "10 cm is longer than 5 cm because 10 is a bigger number than 5." },
      { q: "What comes next: 1, 2, 3, ___?", options: ["2","5","4","6"], answer: 2, explanation: "The pattern counts up by 1 each time: 1, 2, 3, 4." },
      { q: "What is 6 - 6?", options: ["1","0","6","12"], answer: 1, explanation: "Any number minus itself equals 0. 6 - 6 = 0." },
      { q: "How many sides does a pentagon have?", options: ["4","5","6","3"], answer: 1, explanation: "'Penta' means five. A pentagon has 5 sides and 5 corners." },
      { q: "What is 2 + 7?", options: ["8","9","10","7"], answer: 1, explanation: "2 + 7 = 9. Count on 7 from 2: 3,4,5,6,7,8,9." },
      { q: "Which is heavier: a feather or a book?", options: ["Feather","Book","Same weight","Can't tell"], answer: 1, explanation: "A book is much heavier than a feather. We can feel the difference in weight." },
      { q: "What is 4 - 1?", options: ["2","3","4","5"], answer: 1, explanation: "4 - 1 = 3. Taking one away from four leaves three." },
      { q: "What comes next: 10, 20, 30, ___?", options: ["35","38","40","45"], answer: 2, explanation: "The pattern counts up by 10 each time: 10, 20, 30, 40." }
    ]
  },

  secondary: {
    sections: [
      {
        heading: "Integers and Number Operations",
        content: "Integers include positive numbers, negative numbers, and zero. They are used in situations like temperature changes and bank balances. For example, -5 can represent a loss of five units.\n\nOperations with integers follow specific rules. Adding two positive numbers gives a positive result, while adding two negative numbers gives a negative result. Subtracting a negative number is the same as adding a positive number.\n\nUnderstanding integers is important for algebra and real-life applications.",
        simplified: "• Integers include negative numbers.\n• Zero is also an integer.\n• -5 means below zero.\n• Rules help add and subtract.\n• Used in real life."
      },
      {
        heading: "Algebra Basics",
        content: "Algebra uses symbols like x and y to represent unknown values. Equations help us find these unknowns. For example, in 2x = 10, dividing both sides by 2 gives x = 5.\n\nExpressions combine numbers and variables. Simplifying expressions means combining like terms.\n\nAlgebra helps solve real-world problems involving unknown quantities.",
        simplified: "• x stands for unknown.\n• 2x = 10 means x = 5.\n• Combine like terms.\n• Algebra solves problems.\n• Variables are symbols."
      },
      {
        heading: "Geometry Fundamentals",
        content: "Geometry studies shapes, angles, and space. The sum of angles in a triangle is 180 degrees. Parallel lines never meet.\n\nPerimeter is the total boundary of a shape. Area measures surface covered.\n\nGeometry is used in design, construction, and engineering.",
        simplified: "• Triangle angles add to 180°.\n• Parallel lines never meet.\n• Perimeter is boundary.\n• Area is inside space.\n• Geometry studies shapes."
      },
      {
        heading: "Data and Statistics",
        content: "Statistics involves collecting and analyzing data. Mean is average, median is middle value, and mode is most frequent value.\n\nGraphs like bar graphs and pie charts display data visually.\n\nStatistics helps interpret information and make decisions.",
        simplified: "• Mean is average.\n• Median is middle.\n• Mode is most common.\n• Graphs show data.\n• Helps decision making."
      }
    ],
    questionPool: [
      // Original 20
      { q: "What is (-3) + (-4)?", options: ["-7","-1","7","1"], answer: 0, explanation: "Adding two negative numbers: (-3) + (-4) = -7. The negatives combine, making the result more negative." },
      { q: "What is (-5) - (-2)?", options: ["-7","-3","3","7"], answer: 1, explanation: "Subtracting a negative is the same as adding: (-5) - (-2) = -5 + 2 = -3." },
      { q: "Solve: 2x + 3 = 11", options: ["x=3","x=4","x=5","x=7"], answer: 1, explanation: "2x + 3 = 11 → 2x = 11 - 3 = 8 → x = 8 ÷ 2 = 4." },
      { q: "Simplify: 3x + 5x", options: ["8x","8x²","15x","2x"], answer: 0, explanation: "3x + 5x = 8x. Like terms (same variable x) are added by adding coefficients: 3 + 5 = 8." },
      { q: "Solve: 5x - 10 = 0", options: ["x=0","x=2","x=5","x=10"], answer: 1, explanation: "5x - 10 = 0 → 5x = 10 → x = 10 ÷ 5 = 2." },
      { q: "What is the sum of angles in a triangle?", options: ["90°","180°","270°","360°"], answer: 1, explanation: "All three interior angles of any triangle always add up to exactly 180°." },
      { q: "Perimeter of a square with side 6 cm?", options: ["12 cm","18 cm","24 cm","36 cm"], answer: 2, explanation: "Perimeter = 4 × side = 4 × 6 = 24 cm. A square has 4 equal sides." },
      { q: "Area of a rectangle 5 cm × 3 cm?", options: ["8 cm²","15 cm²","16 cm²","25 cm²"], answer: 1, explanation: "Area = length × width = 5 × 3 = 15 cm²." },
      { q: "Find the mean of: 4, 6, 8, 10, 12", options: ["7","8","9","10"], answer: 1, explanation: "Mean = sum ÷ count = (4+6+8+10+12) ÷ 5 = 40 ÷ 5 = 8." },
      { q: "Find the median of: 3, 7, 1, 9, 5", options: ["3","5","7","9"], answer: 1, explanation: "Sort the values: 1, 3, 5, 7, 9. The middle value (3rd of 5) is 5." },
      { q: "What is the mode of: 2, 4, 4, 6, 8, 4?", options: ["2","4","6","8"], answer: 1, explanation: "Mode is the most frequent value. 4 appears 3 times, more than any other value." },
      { q: "What is (-6) × (-2)?", options: ["-12","-8","8","12"], answer: 3, explanation: "Negative × Negative = Positive. (-6) × (-2) = +12." },
      { q: "Expand: 3(x + 4)", options: ["3x+4","3x+7","3x+12","x+12"], answer: 2, explanation: "Multiply 3 by each term inside brackets: 3×x = 3x and 3×4 = 12. Result: 3x + 12." },
      { q: "What is the value of x in: x/3 = 5?", options: ["x=2","x=8","x=15","x=25"], answer: 2, explanation: "x/3 = 5 → x = 5 × 3 = 15. Multiply both sides by 3." },
      { q: "Angles of a triangle are 60°, 80°. Find the third angle.", options: ["30°","40°","50°","60°"], answer: 1, explanation: "Sum of angles = 180°. Third angle = 180 - 60 - 80 = 40°." },
      { q: "What is the range of: 5, 12, 3, 8, 19?", options: ["14","16","19","22"], answer: 1, explanation: "Range = highest - lowest = 19 - 3 = 16." },
      { q: "Which of these is NOT an integer?", options: ["-5","0","3","2.5"], answer: 3, explanation: "Integers are whole numbers (positive, negative, zero). 2.5 has a decimal so it is not an integer." },
      { q: "Solve: 3x + 2 = 2x + 7", options: ["x=3","x=5","x=7","x=9"], answer: 1, explanation: "3x + 2 = 2x + 7 → 3x - 2x = 7 - 2 → x = 5." },
      { q: "Area of a triangle with base 8 cm and height 5 cm?", options: ["13 cm²","20 cm²","40 cm²","80 cm²"], answer: 1, explanation: "Area of triangle = ½ × base × height = ½ × 8 × 5 = 20 cm²." },
      { q: "What is (-8) ÷ 2?", options: ["-4","-6","4","6"], answer: 0, explanation: "Negative ÷ Positive = Negative. (-8) ÷ 2 = -4." },
      // New 20
      { q: "What is (-2) + 9?", options: ["7","11","-7","-11"], answer: 0, explanation: "(-2) + 9: start at -2 and move 9 steps right → 7." },
      { q: "What is 4 × (-3)?", options: ["12","-12","7","-7"], answer: 1, explanation: "Positive × Negative = Negative. 4 × (-3) = -12." },
      { q: "Solve: x + 8 = 15", options: ["x=5","x=6","x=7","x=23"], answer: 2, explanation: "x + 8 = 15 → x = 15 - 8 = 7." },
      { q: "Simplify: 7y - 2y", options: ["5y","9y","5","14y"], answer: 0, explanation: "7y - 2y = 5y. Subtract the coefficients: 7 - 2 = 5, keep the variable y." },
      { q: "What is the perimeter of a rectangle 4 cm × 7 cm?", options: ["11 cm","22 cm","28 cm","44 cm"], answer: 1, explanation: "Perimeter = 2×(length + width) = 2×(4 + 7) = 2×11 = 22 cm." },
      { q: "Find the mean of: 10, 20, 30", options: ["15","20","25","30"], answer: 1, explanation: "Mean = (10+20+30) ÷ 3 = 60 ÷ 3 = 20." },
      { q: "What is (-10) + 4?", options: ["-6","6","-14","14"], answer: 0, explanation: "(-10) + 4 = -6. Start at -10, move 4 steps right, land on -6." },
      { q: "Solve: 4x = 28", options: ["x=5","x=6","x=7","x=8"], answer: 2, explanation: "4x = 28 → x = 28 ÷ 4 = 7." },
      { q: "What is the sum of angles in a quadrilateral?", options: ["180°","270°","360°","540°"], answer: 2, explanation: "All four interior angles of any quadrilateral sum to 360°." },
      { q: "What is the mode of: 5, 3, 5, 7, 3, 5?", options: ["3","5","7","6"], answer: 1, explanation: "5 appears 3 times, 3 appears 2 times, 7 appears once. Mode = 5." },
      { q: "Expand: 2(3x - 1)", options: ["6x-1","6x-2","5x-2","6x+2"], answer: 1, explanation: "2×3x = 6x and 2×(-1) = -2. Result: 6x - 2." },
      { q: "What is (-3)²?", options: ["-9","9","-6","6"], answer: 1, explanation: "(-3)² = (-3)×(-3) = 9. Negative × Negative = Positive." },
      { q: "Area of a square with side 9 cm?", options: ["36 cm²","45 cm²","81 cm²","18 cm²"], answer: 2, explanation: "Area = side² = 9² = 81 cm²." },
      { q: "Find the median of: 11, 4, 7, 2, 9", options: ["4","7","9","11"], answer: 1, explanation: "Sorted: 2, 4, 7, 9, 11. The middle (3rd) value is 7." },
      { q: "Solve: 2x - 4 = 10", options: ["x=3","x=5","x=7","x=10"], answer: 2, explanation: "2x - 4 = 10 → 2x = 14 → x = 7." },
      { q: "What is the absolute value of -15?", options: ["-15","0","1","15"], answer: 3, explanation: "Absolute value is the distance from zero, always positive. |-15| = 15." },
      { q: "Which of these is NOT a factor of 12?", options: ["3","4","5","6"], answer: 2, explanation: "12 ÷ 5 = 2.4 — not a whole number, so 5 is not a factor of 12." },
      { q: "Simplify: 4a + 3b - a + 2b", options: ["3a+5b","5a+5b","3a+b","7ab"], answer: 0, explanation: "Group like terms: (4a - a) + (3b + 2b) = 3a + 5b." },
      { q: "What is the LCM of 4 and 6?", options: ["2","8","12","24"], answer: 2, explanation: "Multiples of 4: 4,8,12... Multiples of 6: 6,12... The lowest common multiple is 12." },
      { q: "A line graph shows temperature rising from 10°C to 25°C. What is the increase?", options: ["10°C","15°C","20°C","25°C"], answer: 1, explanation: "Increase = 25 - 10 = 15°C." }
    ]
  },

  higherSecondary: {
    sections: [
      {
        heading: "Calculus Introduction",
        content: "Calculus studies change. Differentiation measures rate of change, while integration measures accumulation. The derivative of x squared is 2x.\n\nLimits form the foundation of calculus. As x approaches a value, the function approaches a limit.\n\nCalculus is widely used in physics, engineering, and economics.",
        simplified: "• Calculus studies change.\n• Derivative shows rate.\n• Integral shows total.\n• Limits are foundation.\n• Used in science."
      },
      {
        heading: "Trigonometry",
        content: "Trigonometry studies relationships between angles and sides of triangles. Sine, cosine, and tangent are primary ratios.\n\nThe identity sin²θ + cos²θ = 1 is fundamental.\n\nApplications include wave motion and engineering design.",
        simplified: "• Sine, cosine, tangent.\n• Used in triangles.\n• sin²θ + cos²θ = 1.\n• Helps in waves.\n• Used in engineering."
      },
      {
        heading: "Probability Theory",
        content: "Probability measures likelihood of events. It ranges from 0 to 1. Independent events do not affect each other.\n\nConditional probability: P(A|B) = P(A∩B) / P(B).\n\nProbability is used in statistics and risk analysis.",
        simplified: "• Probability is chance.\n• Value between 0 and 1.\n• Independent events don't affect each other.\n• P(A|B) is conditional probability.\n• Used in statistics."
      },
      {
        heading: "Matrices and Determinants",
        content: "Matrices are rectangular arrays of numbers. They are used to solve systems of linear equations.\n\nThe determinant of a 2×2 matrix [[a,b],[c,d]] = ad - bc.\n\nMatrices are used in computer graphics and physics.",
        simplified: "• Matrix is a number table.\n• Helps solve equations.\n• det = ad - bc for 2×2.\n• Used in graphics.\n• Used in physics."
      }
    ],
    questionPool: [
      // Original 20
      { q: "What is the derivative of f(x) = x³?", options: ["x²","3x²","3x³","x⁴"], answer: 1, explanation: "Power rule: d/dx[xⁿ] = nxⁿ⁻¹. So d/dx[x³] = 3x³⁻¹ = 3x²." },
      { q: "What is the derivative of f(x) = 5x² + 3x?", options: ["5x+3","10x+3","10x²+3","5x²+3"], answer: 1, explanation: "Differentiate term by term: d/dx[5x²] = 10x and d/dx[3x] = 3. So f'(x) = 10x + 3." },
      { q: "Evaluate ∫2x dx", options: ["2x²+C","x²+C","2+C","4x+C"], answer: 1, explanation: "∫2x dx = 2 × x^(1+1)/(1+1) + C = 2x²/2 + C = x² + C." },
      { q: "What is lim(x→2) of (x² - 4)/(x - 2)?", options: ["0","2","4","undefined"], answer: 2, explanation: "Factor: (x²-4)/(x-2) = (x+2)(x-2)/(x-2) = x+2. As x→2, x+2 → 4." },
      { q: "What is sin 30°?", options: ["√3/2","1/2","1/√2","1"], answer: 1, explanation: "sin 30° = 1/2. This is a standard trigonometric value to memorise." },
      { q: "What is cos 60°?", options: ["√3/2","1","1/2","0"], answer: 2, explanation: "cos 60° = 1/2. Note: sin 30° = cos 60° = 1/2 because they are complementary angles." },
      { q: "Simplify: sin²θ + cos²θ", options: ["0","1","2","sin2θ"], answer: 1, explanation: "This is the Pythagorean identity: sin²θ + cos²θ = 1, always, for any angle θ." },
      { q: "What is tan 45°?", options: ["0","1/2","1","√3"], answer: 2, explanation: "tan 45° = sin 45°/cos 45° = (1/√2)/(1/√2) = 1." },
      { q: "A coin is tossed twice. P(both heads) = ?", options: ["1/2","1/4","1/3","1/8"], answer: 1, explanation: "P(head) = 1/2. Both tosses are independent so P(HH) = 1/2 × 1/2 = 1/4." },
      { q: "A die is rolled. P(even number) = ?", options: ["1/6","1/3","1/2","2/3"], answer: 2, explanation: "Even numbers on a die: 2, 4, 6 — that's 3 out of 6 outcomes. P = 3/6 = 1/2." },
      { q: "Determinant of [[3,1],[2,4]] = ?", options: ["10","14","5","11"], answer: 0, explanation: "det = (3×4) - (1×2) = 12 - 2 = 10. Formula: ad - bc." },
      { q: "Determinant of [[2,3],[1,5]] = ?", options: ["7","10","13","3"], answer: 0, explanation: "det = (2×5) - (3×1) = 10 - 3 = 7." },
      { q: "What is the derivative of sin(x)?", options: ["-sin(x)","cos(x)","-cos(x)","tan(x)"], answer: 1, explanation: "d/dx[sin(x)] = cos(x). This is a standard derivative to memorise." },
      { q: "What is the derivative of eˣ?", options: ["xeˣ","eˣ⁻¹","eˣ","xe"], answer: 2, explanation: "The exponential function eˣ is unique — its derivative is itself: d/dx[eˣ] = eˣ." },
      { q: "Evaluate ∫3x² dx", options: ["6x+C","x³+C","3x³+C","x²+C"], answer: 1, explanation: "∫3x² dx = 3 × x^(2+1)/(2+1) + C = 3x³/3 + C = x³ + C." },
      { q: "P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2. Find P(A∪B).", options: ["0.5","0.6","0.7","0.9"], answer: 2, explanation: "P(A∪B) = P(A) + P(B) - P(A∩B) = 0.4 + 0.5 - 0.2 = 0.7." },
      { q: "Which is the correct power rule for differentiation?", options: ["d/dx[xⁿ]=xⁿ⁻¹","d/dx[xⁿ]=nxⁿ","d/dx[xⁿ]=nxⁿ⁻¹","d/dx[xⁿ]=(n+1)xⁿ"], answer: 2, explanation: "The power rule states: d/dx[xⁿ] = n·xⁿ⁻¹. Multiply by the exponent, then reduce the exponent by 1." },
      { q: "What is sin²45° + cos²45°?", options: ["0","0.5","1","2"], answer: 2, explanation: "By the Pythagorean identity sin²θ + cos²θ = 1 for any angle, including 45°." },
      { q: "If a matrix has determinant 0, it is...", options: ["Invertible","Singular","Identity","Diagonal"], answer: 1, explanation: "A matrix with determinant = 0 is called a singular matrix and has no inverse." },
      { q: "What is ∫cos(x) dx?", options: ["-sin(x)+C","sin(x)+C","tan(x)+C","-cos(x)+C"], answer: 1, explanation: "∫cos(x) dx = sin(x) + C. This is the reverse of d/dx[sin(x)] = cos(x)." },
      // New 20
      { q: "What is the derivative of f(x) = 4x³ - 2x?", options: ["12x²-2","4x²-2","12x³-2x","4x²-2x"], answer: 0, explanation: "d/dx[4x³] = 12x² and d/dx[-2x] = -2. So f'(x) = 12x² - 2." },
      { q: "What is lim(x→0) of (sin x)/x?", options: ["0","∞","undefined","1"], answer: 3, explanation: "This is a standard limit: lim(x→0) (sin x)/x = 1. It is used as the foundation of differentiation of sin." },
      { q: "Evaluate ∫(4x + 1) dx", options: ["4+C","2x²+x+C","4x²+x+C","2x+1+C"], answer: 1, explanation: "∫4x dx = 2x² and ∫1 dx = x. Combined: 2x² + x + C." },
      { q: "What is cos 0°?", options: ["0","1/2","√3/2","1"], answer: 3, explanation: "cos 0° = 1. At angle zero, the adjacent side equals the hypotenuse." },
      { q: "What is sin 90°?", options: ["0","1/2","1","√3/2"], answer: 2, explanation: "sin 90° = 1. At 90°, the opposite side equals the hypotenuse." },
      { q: "What is 1 + tan²θ equal to?", options: ["sin²θ","cos²θ","sec²θ","cosec²θ"], answer: 2, explanation: "This is a Pythagorean identity: 1 + tan²θ = sec²θ." },
      { q: "A bag has 3 red and 7 blue balls. P(picking red) = ?", options: ["3/7","7/10","3/10","1/3"], answer: 2, explanation: "Total balls = 3 + 7 = 10. P(red) = 3/10." },
      { q: "Two dice are rolled. P(both show 6) = ?", options: ["1/6","1/12","1/36","1/3"], answer: 2, explanation: "P(6 on one die) = 1/6. Both independent: P = 1/6 × 1/6 = 1/36." },
      { q: "Determinant of [[5,0],[0,3]] = ?", options: ["0","8","15","2"], answer: 2, explanation: "det = (5×3) - (0×0) = 15 - 0 = 15. This is a diagonal matrix." },
      { q: "What is the derivative of cos(x)?", options: ["sin(x)","-sin(x)","cos(x)","-cos(x)"], answer: 1, explanation: "d/dx[cos(x)] = -sin(x). Note the negative sign — opposite to d/dx[sin(x)]." },
      { q: "Evaluate ∫sin(x) dx", options: ["cos(x)+C","-cos(x)+C","sin(x)+C","-sin(x)+C"], answer: 1, explanation: "∫sin(x) dx = -cos(x) + C. This reverses d/dx[-cos(x)] = sin(x)." },
      { q: "What is the second derivative of f(x) = x⁴?", options: ["4x³","12x²","x³","24x"], answer: 1, explanation: "First derivative: 4x³. Second derivative: d/dx[4x³] = 12x²." },
      { q: "P(A) = 0.3, P(not A) = ?", options: ["0.3","0.6","0.7","1.3"], answer: 2, explanation: "P(not A) = 1 - P(A) = 1 - 0.3 = 0.7. Complementary events sum to 1." },
      { q: "Which matrix operation is NOT always possible?", options: ["Addition","Scalar multiplication","Transpose","Matrix division"], answer: 3, explanation: "Matrices cannot be 'divided' in the usual sense — you multiply by the inverse instead, and not all matrices have inverses." },
      { q: "What is tan 30°?", options: ["1/√3","√3","1","1/2"], answer: 0, explanation: "tan 30° = sin30°/cos30° = (1/2)/(√3/2) = 1/√3 ≈ 0.577." },
      { q: "What is the integral of 1/x?", options: ["1/x²+C","ln|x|+C","-1/x²+C","x+C"], answer: 1, explanation: "∫(1/x) dx = ln|x| + C. This is the natural log function." },
      { q: "f(x) = x² - 4. Find f(3).", options: ["5","9","13","1"], answer: 0, explanation: "f(3) = 3² - 4 = 9 - 4 = 5." },
      { q: "What is the order of matrix [[1,2,3],[4,5,6]]?", options: ["3×2","2×3","3×3","6×1"], answer: 1, explanation: "This matrix has 2 rows and 3 columns, so its order is 2×3." },
      { q: "What is cos 90°?", options: ["1","√3/2","1/2","0"], answer: 3, explanation: "cos 90° = 0. At 90°, the adjacent side has zero length relative to the hypotenuse." },
      { q: "Evaluate ∫₀¹ 2x dx", options: ["0","1","2","4"], answer: 1, explanation: "∫2x dx = x². Evaluate from 0 to 1: [x²]₀¹ = 1² - 0² = 1." }
    ]
  }
};

window.NOTES_Maths = NOTES_Maths;
if (typeof module !== 'undefined') module.exports = { NOTES_Maths };