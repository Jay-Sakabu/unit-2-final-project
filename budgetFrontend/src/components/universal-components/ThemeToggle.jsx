import '../.././App.css';

export default function ThemeToggle({ currentTheme, onToggle }) {
    return (
        <div className="container--toggle">
            <input
                type="checkbox"
                id="theme-toggle"
                className="toggle--checkbox"
                checked={currentTheme === 'light'}
                onChange={onToggle}
            />
            <label htmlFor="theme-toggle" className="toggle--label">
                <span className="toggle--label-background" />
            </label>
        </div>
    );
}