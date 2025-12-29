Rabuste Café – Project Documentation (Current Progress)

1. Project Vision

Rabuste Café is a digital experience designed to reflect the personality of a modern, premium coffee brand built around bold Robusta coffee. The goal is to create more than a static website: it should feel like an interactive, curated experience that blends coffee, art, learning, and community.

So far, the project has achieved:

•  A working single-page application that simulates a full coffee shop experience online.
•  A consistent brand identity with gothic typography, warm coffee-inspired colors, and subtle motion.
•  An integrated AI “virtual barista” that helps users explore the menu conversationally.

This documentation summarizes what is already implemented in the folder, focusing on features and user journeys rather than technical details.



2. User Experience and Main Flows

2.1 Home Experience

The home screen introduces Rabuste Café as a premium, story-driven coffee brand. It currently includes:

•  A hero section that highlights the core brand promise and visual identity.
•  A sticky or parallax-style section that keeps key brand messages in view as the user scrolls.
•  A gallery teaser that hints at the café’s art and design elements, inviting users to explore more.
•  A preview of the coffee menu, encouraging users to dive deeper into drinks and offerings.
•  A review section that builds trust and communicates social proof.

Together, these elements create an immersive “first impression” of Rabuste Café.

2.2 Menu and Ordering Journey

The menu page presents the full Rabuste offering, structured into clear categories (for example: cold coffee, hot classics, manual brews, shakes, and food items). From a user perspective, the following has been achieved:

•  Users can browse through a curated menu that reflects a real café experience.
•  Items can be added to a cart from the menu, with quantities tracked.
•  The cart page allows users to:
◦  Review selected items.
◦  Adjust quantities.
◦  Remove items.
◦  Clear the cart completely.
•  Cart contents are remembered across visits in the same browser, which mimics a persistent shopping experience.

Although there is no real payment integration yet, the flow from “discovering a drink” to “preparing to check out” is already modeled.

2.3 Workshops, Art, and Awareness

Beyond coffee, Rabuste positions itself as a space for creativity and education. The project captures this through several dedicated sections:

•  Workshops page: Introduces the idea of coffee workshops, brewing sessions, or community events. It can be extended later to support schedules, registrations, or booking.
•  Art page: Showcases the artistic side of the brand—visuals, media, and a gallery-like feel that aligns with the café’s identity.
•  Awareness/philosophy page: Explores the brand’s deeper philosophy, such as sustainability, coffee origins, or the story behind Robusta. This page helps Rabuste feel like a mission, not just a menu.
•  Robusta story page: A focused narrative on why Robusta matters, what makes it unique, and how Rabuste is built around it.

These sections elevate the site from a simple ordering interface to a complete brand storytelling platform.

2.4 Find Store and FAQ

Two supporting experiences are in place:

•  Find Store page: Orients users towards the physical café presence (e.g., locations, how to reach them, or hints of expansion). It lays the foundation for a more detailed store locator in the future.
•  FAQ page: Centralizes answers to common questions about the café, menu, policies, or experiences. This reduces friction and helps users quickly understand how Rabuste operates.



3. Virtual Barista – Rabuste BrewDesk

One of the most distinctive achievements so far is the AI-powered assistant integrated into the site.

3.1 In-Site Chat Experience

A floating chat widget appears as a button on the bottom-right of the screen. When opened, it reveals a carefully designed chat window branded as “RABUSTE – Virtual Barista.”

Key achievements in the chat experience:

•  A friendly welcome state that invites users to ask questions.
•  A clear separation between user messages and assistant responses, styled in coffee-themed colors.
•  Smooth scrolling and automatic focus on the latest messages to make the conversation feel natural.
•  Graceful handling of busy or error states with human-style fallback messages.

The chat feels like talking to a barista who understands both the menu and the brand’s tone.

3.2 Gemini-Powered Backend

Behind the chat widget is a separate chatbot service that communicates with Google’s Gemini models. This service:

•  Uses a curated, structured “knowledge base” of the Rabuste menu, including categories and pricing.
•  Instructs the model to behave as “Rabuste BrewDesk,” the official Rabuste assistant.
•  Enforces simple, clean formatting rules suitable for the chat UI (vertically listed items, no unnecessary styling).
•  Focuses the assistant on coffee- and menu-related topics, politely declining unrelated requests.

As a result, users can:

•  Ask for menu recommendations (“What should I drink if I like something strong and cold?”).
•  Explore specific categories (“Show me all the manual brews.”).
•  Understand prices and options in a conversational way.

This turns the website into an interactive discovery tool instead of a static menu.



4. Brand, Design, and Media

The project makes deliberate use of branding and media to support the Rabuste identity:

•  Typography, colors, and layout are chosen to evoke a gothic yet modern coffeehouse feel.
•  Motion and transitions (such as fading between sections and pages) give the site a polished, award-style experience.
•  Images and videos (coffee beans, café visuals, and branding artifacts) reinforce the sensory feel of the brand.
•  The logo and variations (standard and compact versions) are integrated to keep the brand visible across pages.

These choices mean that even in its current state, the site communicates a strong, recognizable personality.



5. Admin Experience and Operations

An initial version of an admin-only area is in place:

•  Access to the admin dashboard is gated by a dedicated login screen.
•  A simple authentication gate ensures that everyday users cannot accidentally enter the admin section.
•  The interface shows the last successful login time, giving basic operator visibility and signaling that this area is “managed.”

While the current implementation is intentionally lightweight, it demonstrates:

•  A clear separation between public and administrative experiences.
•  Room to grow into real operational tools (menu management, orders, analytics, etc.).



6. Documentation and Flowcharts

Beyond the running application, the project also includes visual documentation:

•  Flowcharts describing major user flows, such as:
◦  Menu browsing and ordering.
◦  Workshop-related journeys.
◦  Franchise or expansion-related pages.
•  These diagrams serve as design blueprints, helping team members understand how users are expected to move through the experience.

Together with this written summary, those flowcharts provide a strong foundation for onboarding new contributors, presenting the project, or planning future iterations.



7. Current Status and Next Steps

7.1 What Is Already Achieved

•  A functioning single-page application that covers key user journeys: discover, explore, learn, and (simulated) order.
•  A branded, immersive coffee and art experience.
•  A working AI assistant specialized in the Rabuste menu and tone.
•  Basic admin access and stateful cart behavior for users.
•  Visual flow documentation of core journeys.




8. Future Implementations
This section outlines the major features that are planned but not yet implemented in the Rabuste Café website. These features are supported by design flowcharts and serve as the roadmap for future development.
8.1 Intelligent Recommendation System
A key future enhancement is the introduction of an intelligent recommendation system to personalize the café experience for users.
At present, recommendations are limited and rule-based. In future iterations, the system will evolve into a hybrid recommendation framework that combines predefined logic with machine learning techniques.
The recommendation system will consider the following contextual inputs:
• User mood (e.g., tired, relaxed, focused, social)
 • Time of day (morning, afternoon, evening, night)
 • Current activity (studying, working, casual hangout)
Based on these inputs, the system will recommend categories and types of coffee, rather than specific products, allowing flexibility while still guiding the user meaningfully.
To improve personalization over time, the system will also analyze:
• Recent orders stored in browser local storage
 • Frequently selected coffee categories
 • Time-based ordering patterns
This approach enables personalization without requiring mandatory user authentication.
Each recommendation will include a short explanation (for example, “Recommended because you usually prefer strong coffee during late study hours”), improving transparency and user trust.

8.2 Smart Checkout Page Recommendations
The checkout page will be enhanced with a dual-recommendation system aimed at increasing usability and order value.
The checkout experience will include two clearly separated recommendation sections:
Rule-Based Pair Recommendations
 This section will suggest commonly paired items using predefined café pairing logic, such as:
• Coffee paired with complementary snacks
 • Cold beverages paired with desserts
 • Strong coffee paired with light side items
These suggestions rely on domain knowledge and function reliably even when no user history is available.
Collaborative Filtering Model (CFM) Based Recommendations
 A second section will use collaborative filtering techniques to generate personalized recommendations based on:
• Similar user ordering behavior
 • Item-to-item similarity
 • Aggregated historical order patterns
This machine-learning-based approach enables deeper personalization beyond static rules.

8.3 Flowcharts for Future Features
The project includes flowcharts that visually represent planned system workflows and future enhancements.

![ORDER_FLOWCHART](https://github.com/user-attachments/assets/7bce99d5-a553-4d67-919d-43ba358a4366)

![MENU FLOWCHART](https://github.com/user-attachments/assets/9f27b0f9-2612-470b-9f8f-95912e7262a6)





































