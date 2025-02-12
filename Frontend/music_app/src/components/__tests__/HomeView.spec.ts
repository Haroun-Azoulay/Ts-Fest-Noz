import { afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import SigninView from "@/composables/Authentification/SigninPage.vue";
import HomeView from "@/views/Home/HomeView.vue";
import { mount, shallowMount } from "@vue/test-utils";
import { useRouter } from 'vue-router';
import { nextTick } from 'vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
  useRoute: vi.fn(),
}));

describe('HomeView.vue', () => {
  afterEach(() => {
    localStorage.removeItem('authToken');
  });
  it('1 - should redirect anonymous users to /signin/ when clicking on go to login button', async () => {
    const mockRouterPush = vi.fn();
    const mockRouterAfterEach = vi.fn();
    useRouter.mockReturnValue({
      push: mockRouterPush,
      afterEach: mockRouterAfterEach,
    });
    const wrapper = mount(HomeView);
    const button = wrapper.find('[data-test="goToLoginPage"]');
    expect(button.exists()).toBe(true);
    await button.trigger('click');
    expect(mockRouterPush).toHaveBeenCalledWith('/signin');
  });
  it('2 - should not show go to city button to anonymous users', async () => {
    const mockRouterPush = vi.fn();
    const mockRouterAfterEach = vi.fn();
    useRouter.mockReturnValue({
      push: mockRouterPush,
      afterEach: mockRouterAfterEach,
    });
    const wrapper = mount(HomeView);
    const button = wrapper.find('[data-test="goToCityPage"]');
    expect(button.exists()).toBe(false);
  });
})
