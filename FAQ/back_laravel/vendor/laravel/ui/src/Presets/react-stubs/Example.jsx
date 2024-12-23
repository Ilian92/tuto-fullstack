import React from 'react';
import ReactDOM from 'react-dom/client';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function Example() {
    return (
        <Popover>
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button>
            Solutions
            <ChevronDownIcon className={open ? 'rotate-180 transform' : ''} />
          </Popover.Button>
          <Popover.Panel>
            <a href="/insights">Insights</a>
            <a href="/automations">Automations</a>
            <a href="/reports">Reports</a>
          </Popover.Panel>
        </>
      )}
    </Popover>
    );
}

export default Example;

if (document.getElementById('example')) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <Example/>
        </React.StrictMode>
    )
}
