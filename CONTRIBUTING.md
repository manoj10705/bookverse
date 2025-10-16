# Contributing to BookVerse

Thank you for your interest in contributing to BookVerse! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/bookverse.git
   cd bookverse
   ```
3. **Set up the development environment** following the [SETUP.md](SETUP.md) guide
4. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Formatting**: The project uses Prettier for code formatting
- **Linting**: ESLint is configured for code quality
- **Naming**: Use descriptive names for variables, functions, and components

### Component Guidelines

- **React Components**: Use functional components with hooks
- **File Structure**: One component per file, named with PascalCase
- **Props**: Define TypeScript interfaces for all component props
- **Styling**: Use Tailwind CSS classes for styling

### Backend Guidelines

- **Convex Functions**: Follow the existing patterns for queries, mutations, and actions
- **Validation**: Always use argument validators with `v` from `convex/values`
- **Error Handling**: Provide meaningful error messages
- **Authentication**: Use `getAuthUserId()` for protected functions

## Making Changes

### Adding New Features

1. **Plan your feature**: Open an issue to discuss the feature before implementing
2. **Update the schema** if needed in `convex/schema.ts`
3. **Create backend functions** in the appropriate `convex/*.ts` file
4. **Create/update React components** in `src/components/`
5. **Add proper TypeScript types** for all new code
6. **Test your changes** thoroughly

### Example: Adding a New Feature

Let's say you want to add a "favorite books" feature:

1. **Update Schema**:
   ```typescript
   // convex/schema.ts
   userProfiles: defineTable({
     // ... existing fields
     favoriteBooks: v.optional(v.array(v.id("books"))),
   })
   ```

2. **Add Backend Functions**:
   ```typescript
   // convex/users.ts
   export const addFavoriteBook = mutation({
     args: { bookId: v.id("books") },
     handler: async (ctx, args) => {
       // Implementation
     },
   });
   ```

3. **Create React Component**:
   ```typescript
   // src/components/FavoriteButton.tsx
   interface FavoriteButtonProps {
     bookId: Id<"books">;
   }
   
   export default function FavoriteButton({ bookId }: FavoriteButtonProps) {
     // Implementation
   }
   ```

### Testing Your Changes

1. **Manual Testing**:
   - Test all user flows affected by your changes
   - Test on different screen sizes (mobile, tablet, desktop)
   - Test with different user states (logged in, logged out)

2. **Check for Errors**:
   - No TypeScript errors: `npm run lint`
   - No console errors in the browser
   - No Convex function errors in the dashboard

3. **Test Edge Cases**:
   - Empty states (no data)
   - Error states (network failures)
   - Loading states

## Submitting Changes

### Before Submitting

1. **Update documentation** if needed
2. **Run linting**: `npm run lint`
3. **Test thoroughly** in development
4. **Commit with clear messages**:
   ```bash
   git add .
   git commit -m "feat: add favorite books functionality"
   ```

### Pull Request Process

1. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Detailed description of what was added/changed
   - Screenshots if UI changes were made
   - Any breaking changes noted

3. **PR Template**:
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Tested manually
   - [ ] No TypeScript errors
   - [ ] No console errors
   
   ## Screenshots (if applicable)
   Add screenshots here
   ```

## Code Review Process

- All submissions require review before merging
- Reviewers will check for:
  - Code quality and style
  - Functionality and testing
  - Documentation updates
  - Breaking changes

## Common Contribution Areas

### Easy First Contributions

- **UI Improvements**: Better styling, responsive design fixes
- **Bug Fixes**: Fix existing issues
- **Documentation**: Improve README, add code comments
- **Accessibility**: Add ARIA labels, keyboard navigation

### Medium Contributions

- **New Components**: Book lists, user dashboards, search filters
- **Feature Enhancements**: Better search, sorting options
- **Performance**: Optimize queries, reduce bundle size

### Advanced Contributions

- **New Features**: Social features, book recommendations, admin panel
- **Integrations**: External book APIs, email notifications
- **Architecture**: Database optimizations, caching strategies

## Reporting Issues

When reporting bugs or requesting features:

1. **Check existing issues** first
2. **Use issue templates** when available
3. **Provide detailed information**:
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Browser/OS information
   - Screenshots if helpful

## Questions?

- **General Questions**: Open a GitHub Discussion
- **Bug Reports**: Open a GitHub Issue
- **Feature Requests**: Open a GitHub Issue with the "enhancement" label
- **Development Help**: Check the Convex Discord community

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project README (for significant contributions)
- Release notes (for major features)

Thank you for contributing to BookVerse! 🎉
