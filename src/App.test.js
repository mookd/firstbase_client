import { act, render, screen, waitFor, waitForElement, waitForElementToBeRemoved } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import App from './App';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider, InMemoryCache, possibleTypes } from '@apollo/client/testing';
import { GET_PEOPLE_QUERY } from './useRequest';
import { fireEvent } from '@testing-library/react'

Enzyme.configure({ adapter: new Adapter() });
const range = n => [...Array(n).keys()];
const peoplemocks = [
  {
    request: {
      query: GET_PEOPLE_QUERY
    },
    result: {
      data: {
        people:
          range(10).map(i => ({
            id: i,
            name: {
                __typename: "Name",
                title: 'mockTitle'+i,
                first: 'mockFirst'+i,
                last: 'mockLast'+i
            },
            picture: {
                __typename: "Picture",
                thumbnail: 'mock.jpg'
            }
          }))
        }
    }
  }
];
const errormocks = [
  {
    request: {
      query: GET_PEOPLE_QUERY
    },
    error: new Error('an error occur')
  }
];

const updateWrapper = async (wrapper, time = 10) => {
  await act(async () => {
    await new Promise(res => setTimeout(res, time));
  });
};

  it('renders without error', async () => {
    const { act, create } = TestRenderer;
    let component;
    act(() => {
        component = create(
        <MockedProvider>
          <App />
        </MockedProvider>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
    expect(component.toJSON().children).toContain('Loading...');

    await act(async () => {
        component.update(
          <MockedProvider 
            mocks={peoplemocks} 
            addTypename
            defaultOptions={{
              watchQuery: { fetchPolicy: 'no-cache' },
              query: { fetchPolicy: 'no-cache' } 
            }}
            cache={
              new InMemoryCache({
                possibleTypes,
              })
            }
          >
            <App />
          </MockedProvider>)
    });

    console.log("component.toJSON() = ", component.toJSON());
    expect(await component.root.findAllByProps({ className: 'person' }, 
      {}, {timeout: 1000}).length).toEqual(10);

  });

  it('render with error', async () => {
    const { act } = TestRenderer;
    let component;
    await act(async () => {
      new Promise(() => {
        component = TestRenderer.create(
        <MockedProvider mocks={errormocks}>
          <App />
        </MockedProvider>
      )}).then(() => {
        expect(component.toJSON().children).toContain('Something went wrong!');
      });
    });
  });

  it('user text is echoed', async () => {
    const { act, create } = TestRenderer;
    let component;
    await act(async () => {
      new Promise(() => {
        component = create(
          <MockedProvider mocks={peoplemocks}>
            <App />
          </MockedProvider>
      )}).then(() => {
        expect(screen.findByText('First Name')).toBeVisible();
        console.log("here");
        const firstSeachBox = component.toJSON().findAllByType('input');
        console.log("firstSearchBox = ", firstSeachBox);
      });
    });
      
      // console.log("component = ", component);


    // console.log("props = ", AppComponent.props);
    // const firstSeachBox = component.toJSON().findAllByType('input')[0];
    // fireEvent.change(firstSeachBox, { target: { value: 'test' } })
    // console.log(firstSeachBox);

    // console.log(component.root.findByType('div'));

      // const wrapper = mount(        
      // <MockedProvider mocks={errormocks}>
      //   <App />
      // </MockedProvider>);
      // wrapper.find("input").simulate("change", {
      //     target: { value: "hello"}
      // });

      // expect(wrapper.find("input").props()).toBe(true);

      // expect(wrapper.find("input").props().value).toEqual("hello");
  });

// });
  // test("user text is echoed", () => {
  //     const wrapper = mount(<SearchBar onChange={() => {}} />);
  //     wrapper.find("input").simulate("change", {
  //         target: { value: "hello"}
  //     });

  //     expect(wrapper.find("input").props()).toBe(true);

  //     expect(wrapper.find("input").props().value).toEqual("hello");
  // });

  // test("when the form is submited the event is cancelled", () => {
  //     const wrapper = shallow(<SearchBar />);
  //     let prevented = false;
  //     wrapper.find("form").simulate("submit", {
  //         preventDefault: () => {
  //             prevented = true;
  //         }
  //     });
  //     expect(prevented).toBe(true);
  // });

  // test("renders search results when the articles change", () => {
  //     const wrapper = mount(<Search articles={[]} />);

  //     wrapper.setProps({
  //         articles: [{ webUrl: "http://google.com", webTitle: "Google Search"}]
  //     });

  //     expect(wrapper.find("a").prop("href")).toEqual("http://google.com");
  // });
