# Description

A Todo app made with composition instead of classes to avoid duplication, and
following the SOLID design principles to the best of my abilities.

# Technologies Used

- HTML
- CSS
- JavaScript
- Webpack
- Font Awesome
- Google Fonts
- Local Storage

# Features 

- A default task list.
- Create new task lists.
- Update the title of custom task lists.
- Delete the custom task lists.
- Name of the active task list in the header.
- Create new tasks, with title, description, priority and deadline.
- Choose the task list to create the tasks in.
- Update the tasks.
- Mark the tasks as complete or incomplete.
- Tasks styled based on their status, priority, and deadline.
- Sort the tasks based on priority and deadline, in ascending and descending order.
- Filter the tasks based on their status (completed, due, overdue), priority (low,
medium, high), and deadline (today, this month, user selected date).
- Save the state in the browser's memory by using the localStorage API.

# Future Additions

- A reminder function.
- A fully responsive layout, on screens big and small.
- And more...

# What I Learned

- Favoring composition over classes to avoid duplication. The way I've designed my 
factories lets me add or remove fields without touching my existing code. Meaning 
I don't have to create a fool proof blueprint which makes my objects flexible.

- Creating every major node as a seperate module. This lets me change the look and functionality of the app in sections. And most importantly it lets me do what's described in the next point.

- Import state in the modules it's needed instead of passing it as an arguement to nodes that don't need it in order to reach the node that do. The ESM exports are live bindings so there is no closure, which means the UI always renders the current state.

- Selecting the object to render contents fron does not count as filtering. I was
struggling to fit the 'Select All' button in the Filter section when it didn't belong
there. Now I choose the list to filter and sort based on if there is an active task list.

- And the most important one of all, using IDs to reference data instead of putting entire objects in fields for what I assumed was easy access. Since I use Local Storage to preserve state in the browser's memory, putting the active task list object in my state caused me a lot of headache as I struggled to find why my state had frozen. It turns out that the active task list's reference to the task list was breaking upon being saved and retrieved from the Local Storage. It was pretty easily solved by storing the ID of the active task list in the state and using a helper function to retrive the active task list.