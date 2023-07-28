<div className="w-full flex">
            <label htmlFor="description9" className="w-1/2 text-start">
              Income Group Code:
            </label>
            <select
              id="description9"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={selectedIncomeGroup}
              onChange={(e) => setSelectedIncomeGroup(e.target.value)}
            >
              <option value="">Income group</option>
              {selectedIncomeGroup.map((group) => (
                <option key={group.id} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>