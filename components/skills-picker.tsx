import { useState } from "react";
import { Input } from "./ui/input";

interface SkillsPickerProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillsPicker({
  selectedSkills,
  onChange,
}: SkillsPickerProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!selectedSkills.includes(inputValue.trim())) {
        onChange([...selectedSkills, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeSkill = (skill: string) => {
    onChange(selectedSkills.filter((s) => s !== skill));
  };

  return (
    <div className="max-w-xl ">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedSkills.map((skill) => (
          <span
            key={skill}
            className="bg-green-200 dark:bg-green-600 px-2 py-1 rounded flex items-center"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="ml-1 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
